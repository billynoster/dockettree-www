/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Uses a **dedicated marketing Postmark server** (not the in-app
 * “Docket Tree” transactional server). Set these on the Cloudflare Pages
 * project (Production + Preview). Never commit tokens.
 *
 *   POSTMARK_SERVER_TOKEN  — marketing server API token (secret)
 *   POSTMARK_FROM          — verified From on that marketing server (TBD)
 *   POSTMARK_TO            — destination inbox from env ONLY (never hardcode)
 *   POSTMARK_MESSAGE_STREAM — optional on that server; default "outbound"
 *
 * If token / From / To are missing → 200 { ok: true, dryRun: true }.
 * Reply-To is the submitter’s form email (not POSTMARK_TO).
 */

const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_COMPANY = 160
const MAX_MESSAGE = 5000

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

function bad(message) {
  return json(400, { ok: false, error: message })
}

function isEmail(value) {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (!v || v.length > MAX_EMAIL) return false
  // Practical check — not a full RFC parser.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function onRequestPost(context) {
  let payload
  try {
    payload = await context.request.json()
  } catch {
    return bad('Invalid JSON body.')
  }

  if (!payload || typeof payload !== 'object') {
    return bad('Invalid request.')
  }

  // Honeypot — bots fill hidden "website"; humans leave it empty.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json(200, { ok: true, dryRun: true })
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const company =
    typeof payload.company === 'string' ? payload.company.trim() : ''
  const message =
    typeof payload.message === 'string' ? payload.message.trim() : ''

  if (!name || name.length > MAX_NAME) {
    return bad('Please enter your name.')
  }
  if (!isEmail(email)) {
    return bad('Please enter a valid email address.')
  }
  if (company.length > MAX_COMPANY) {
    return bad('Company name is too long.')
  }
  if (!message || message.length > MAX_MESSAGE) {
    return bad('Please enter a message.')
  }

  const env = context.env || {}
  const token = env.POSTMARK_SERVER_TOKEN
  const from = env.POSTMARK_FROM
  const to = env.POSTMARK_TO
  const stream = env.POSTMARK_MESSAGE_STREAM || 'outbound'

  if (!token || !from || !to) {
    return json(200, {
      ok: true,
      dryRun: true,
      message:
        'Contact received (dry-run). Postmark env vars are not configured.',
    })
  }

  const subject = `Docket Tree contact — ${name}${company ? ` (${company})` : ''}`
  const textBody = [
    'New contact form submission from dockettree.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '—'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const htmlBody = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#202623">
      <p style="margin:0 0 12px"><strong>New contact form submission</strong> from dockettree.com</p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#606861">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#606861">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#606861">Company</td><td>${escapeHtml(company || '—')}</td></tr>
      </table>
      <p style="margin:16px 0 6px;color:#606861">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `.trim()

  try {
    const pmRes = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: from,
        To: to,
        ReplyTo: email,
        Subject: subject,
        TextBody: textBody,
        HtmlBody: htmlBody,
        MessageStream: stream,
      }),
    })

    if (!pmRes.ok) {
      const detail = await pmRes.text().catch(() => '')
      console.error('Postmark error', pmRes.status, detail.slice(0, 500))
      return json(502, {
        ok: false,
        error: 'Unable to send your message right now. Please try again shortly.',
      })
    }

    return json(200, { ok: true })
  } catch (err) {
    console.error('Contact send failed', err)
    return json(500, {
      ok: false,
      error: 'Unable to send your message right now. Please try again shortly.',
    })
  }
}

export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context)
  }
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Max-Age': '86400',
      },
    })
  }
  return json(405, { ok: false, error: 'Method not allowed.' })
}
