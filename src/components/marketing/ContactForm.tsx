'use client'

import { useId, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<
  Record<'name' | 'email' | 'message' | 'form', string>
>

export function ContactForm() {
  const formId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [dryRun, setDryRun] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setDryRun(false)

    const next: FieldErrors = {}
    if (!name.trim()) next.name = 'Enter your name.'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!message.trim()) next.message = 'Enter a message.'
    if (Object.keys(next).length) {
      setErrors(next)
      setStatus('error')
      return
    }

    setStatus('submitting')

    const body = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message.trim(),
      website,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })

      // Try Live (`serve out`) has no Pages Functions — demo UI via dry-run.
      if (res.status === 404 || res.status === 405) {
        setDryRun(true)
        setStatus('success')
        setName('')
        setEmail('')
        setCompany('')
        setMessage('')
        return
      }

      let data: { ok?: boolean; dryRun?: boolean; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (!res.ok || !data.ok) {
        setErrors({
          form:
            data.error ||
            'Unable to send your message right now. Please try again.',
        })
        setStatus('error')
        return
      }

      setDryRun(Boolean(data.dryRun))
      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
    } catch {
      // Network / static host without /api — still demo the success path.
      setDryRun(true)
      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
    }
  }

  const inputClass = cn(
    'mt-1.5 w-full rounded-lg border border-stone bg-white px-3.5 py-2.5 text-sm text-charcoal',
    'placeholder:text-slate/55',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
  )

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-5"
      noValidate
      aria-describedby={
        status === 'success'
          ? `${formId}-success`
          : errors.form
            ? `${formId}-form-error`
            : undefined
      }
    >
      {/* Honeypot — visually hidden, ignored by assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-name`}
          className="text-sm font-medium text-charcoal"
        >
          Name <span className="text-slate">(required)</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
        />
        {errors.name ? (
          <p id={`${formId}-name-err`} className="mt-1.5 text-sm text-[#8a3b2b]" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={`${formId}-email`}
          className="text-sm font-medium text-charcoal"
        >
          Email <span className="text-slate">(required)</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-err` : undefined}
        />
        {errors.email ? (
          <p id={`${formId}-email-err`} className="mt-1.5 text-sm text-[#8a3b2b]" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={`${formId}-company`}
          className="text-sm font-medium text-charcoal"
        >
          Company <span className="text-slate">(optional)</span>
        </label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="text-sm font-medium text-charcoal"
        >
          Message <span className="text-slate">(required)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputClass, 'min-h-[9rem] resize-y')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${formId}-message-err` : undefined
          }
        />
        {errors.message ? (
          <p
            id={`${formId}-message-err`}
            className="mt-1.5 text-sm text-[#8a3b2b]"
            role="alert"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      {errors.form ? (
        <p
          id={`${formId}-form-error`}
          className="rounded-lg border border-[#e4c4bc] bg-[#fbf1ee] px-3.5 py-3 text-sm text-[#8a3b2b]"
          role="alert"
        >
          {errors.form}
        </p>
      ) : null}

      {status === 'success' ? (
        <p
          id={`${formId}-success`}
          className="rounded-lg border border-evergreen/25 bg-pale-moss px-3.5 py-3 text-sm text-evergreen-deep"
          role="status"
          aria-live="polite"
        >
          {dryRun
            ? 'Thanks — your message was accepted in dry-run mode (Postmark is not configured on this host). Nothing was emailed.'
            : 'Thanks — your message is on its way. We will get back to you soon.'}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
