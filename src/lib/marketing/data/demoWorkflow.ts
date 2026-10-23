export type WorkflowStageId =
  | 'identify'
  | 'request'
  | 'waiting'
  | 'review'
  | 'ready'

export const DEMO_WORKFLOW = [
  {
    id: 'identify' as const,
    label: 'Identify gap',
    title: 'Identify missing requirement',
    body: 'Spot which documents or requirements are still open for a vendor before work is scheduled.',
    panel: {
      title: 'Missing requirement',
      chip: 'Needs Action',
      chipClass: 'status-chip-needs',
      detail: 'Safety acknowledgment missing for Ironwood Pest Control.',
      rows: ['Insurance certificate · Accepted', 'Service agreement · Accepted'],
    },
  },
  {
    id: 'request' as const,
    label: 'Request',
    title: 'Request document',
    body: 'A document update has been requested from the vendor — ownership stays visible to your team.',
    panel: {
      title: 'Request sent',
      chip: 'Waiting on Vendor',
      chipClass: 'status-chip-waiting',
      detail: 'Document update requested from the vendor. Ownership stays visible.',
      rows: ['Requested · Safety acknowledgment', 'Assigned · Vendor portal'],
    },
  },
  {
    id: 'waiting' as const,
    label: 'Waiting',
    title: 'Waiting on Vendor',
    body: 'The request remains visible with clear ownership while the vendor responds.',
    panel: {
      title: 'Waiting on Vendor',
      chip: 'Waiting on Vendor',
      chipClass: 'status-chip-waiting',
      detail: 'Request remains open until the vendor submits a document.',
      rows: ['No submission yet', 'Reminder available'],
    },
  },
  {
    id: 'review' as const,
    label: 'In Review',
    title: 'In Review',
    body: 'The newly submitted document is ready for review against your requirements.',
    panel: {
      title: 'In Review',
      chip: 'In Review',
      chipClass: 'status-chip-review',
      detail: 'New submission ready for review against your requirements.',
      rows: ['Insurance certificate v2 submitted', 'Reviewer · Operations'],
    },
  },
  {
    id: 'ready' as const,
    label: 'Ready',
    title: 'Ready',
    body: 'Required items have been reviewed and the vendor is ready for the relevant work, subject to your organization’s rules.',
    panel: {
      title: 'Ready for work',
      chip: 'Ready',
      chipClass: 'status-chip-ready',
      detail: 'Required items reviewed. Vendor is ready subject to your rules.',
      rows: ['All required current', 'Next expiration tracked'],
    },
  },
] as const

export function getWorkflowStage(id: WorkflowStageId) {
  return DEMO_WORKFLOW.find((s) => s.id === id)!
}
