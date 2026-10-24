/**
 * Ironwood Pest Control — one coherent vendor journey for the
 * “From request to ready” marketing stepper. Fictional demo data only.
 */

export type WorkflowStageId =
  | 'identify'
  | 'request'
  | 'waiting'
  | 'review'
  | 'ready'

export type RequirementState =
  | 'accepted'
  | 'missing'
  | 'requested'
  | 'waiting'
  | 'in-review'

export type WorkflowRequirement = {
  id: string
  name: string
  state: RequirementState
  stateLabel: string
}

export type WorkflowStage = {
  id: WorkflowStageId
  label: string
  /** Stage headline in the preview (brief wording). */
  title: string
  /** Short explanation + operational outcome. */
  body: string
  /** Who needs to act / what happens next. */
  outcome: string
  status: string
  statusClass: string
  acceptedCount: number
  requirements: WorkflowRequirement[]
  /** Optional contextual note under the checklist (request/review state). */
  contextNote?: string
}

const REQ = {
  insurance: 'Insurance certificate',
  service: 'Service agreement',
  safety: 'Safety acknowledgment',
} as const

export const WORKFLOW_VENDOR = {
  name: 'Ironwood Pest Control',
  trade: 'Pest control',
  property: 'Westfield Plaza',
} as const

export const DEMO_WORKFLOW: readonly WorkflowStage[] = [
  {
    id: 'identify',
    label: 'Identify gap',
    title: 'Something needs attention.',
    body: 'Ironwood’s insurance certificate and service agreement are already accepted. The safety acknowledgment is still missing.',
    outcome: 'Your team needs to request the outstanding acknowledgment before work can proceed.',
    status: 'Needs Action',
    statusClass: 'status-chip-needs',
    acceptedCount: 2,
    requirements: [
      { id: 'ins', name: REQ.insurance, state: 'accepted', stateLabel: 'Accepted' },
      { id: 'svc', name: REQ.service, state: 'accepted', stateLabel: 'Accepted' },
      {
        id: 'saf',
        name: REQ.safety,
        state: 'missing',
        stateLabel: 'Missing',
      },
    ],
    contextNote: 'Outstanding: safety acknowledgment for Westfield Plaza.',
  },
  {
    id: 'request',
    label: 'Request',
    title: 'Request what’s missing.',
    body: 'Send a document request for the safety acknowledgment so Ironwood knows exactly what to provide.',
    outcome: 'Ownership stays with the vendor until they respond in the portal.',
    status: 'Request Sent',
    statusClass: 'status-chip-waiting',
    acceptedCount: 2,
    requirements: [
      { id: 'ins', name: REQ.insurance, state: 'accepted', stateLabel: 'Accepted' },
      { id: 'svc', name: REQ.service, state: 'accepted', stateLabel: 'Accepted' },
      {
        id: 'saf',
        name: REQ.safety,
        state: 'requested',
        stateLabel: 'Requested',
      },
    ],
    contextNote: 'Request sent · Safety acknowledgment · Vendor portal',
  },
  {
    id: 'waiting',
    label: 'Waiting on Vendor',
    title: 'Know who’s up next.',
    body: 'The request remains open with clear ownership while Ironwood prepares the acknowledgment.',
    outcome: 'Ironwood Pest Control needs to submit the document next.',
    status: 'Waiting on Vendor',
    statusClass: 'status-chip-waiting',
    acceptedCount: 2,
    requirements: [
      { id: 'ins', name: REQ.insurance, state: 'accepted', stateLabel: 'Accepted' },
      { id: 'svc', name: REQ.service, state: 'accepted', stateLabel: 'Accepted' },
      {
        id: 'saf',
        name: REQ.safety,
        state: 'waiting',
        stateLabel: 'Waiting',
      },
    ],
    contextNote: 'Waiting on · Ironwood Pest Control',
  },
  {
    id: 'review',
    label: 'In Review',
    title: 'Review the submission.',
    body: 'Ironwood uploaded the safety acknowledgment. Your team can review it against the requirement.',
    outcome: 'Operations reviews the submission before readiness updates.',
    status: 'In Review',
    statusClass: 'status-chip-review',
    acceptedCount: 2,
    requirements: [
      { id: 'ins', name: REQ.insurance, state: 'accepted', stateLabel: 'Accepted' },
      { id: 'svc', name: REQ.service, state: 'accepted', stateLabel: 'Accepted' },
      {
        id: 'saf',
        name: REQ.safety,
        state: 'in-review',
        stateLabel: 'In Review',
      },
    ],
    contextNote: 'Submitted · Safety acknowledgment · Reviewer · Operations',
  },
  {
    id: 'ready',
    label: 'Ready',
    title: 'Everything required is in place.',
    body: 'All three requirements are accepted. Readiness reflects the requirements configured for this work or property — not a legal certification.',
    outcome: 'Ironwood Pest Control is ready for the relevant work at Westfield Plaza.',
    status: 'Ready',
    statusClass: 'status-chip-ready',
    acceptedCount: 3,
    requirements: [
      { id: 'ins', name: REQ.insurance, state: 'accepted', stateLabel: 'Accepted' },
      { id: 'svc', name: REQ.service, state: 'accepted', stateLabel: 'Accepted' },
      {
        id: 'saf',
        name: REQ.safety,
        state: 'accepted',
        stateLabel: 'Accepted',
      },
    ],
  },
] as const

export function getWorkflowStage(id: WorkflowStageId) {
  return DEMO_WORKFLOW.find((s) => s.id === id)!
}
