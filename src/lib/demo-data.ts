/**
 * @deprecated Prefer `@/lib/marketing/data`. Re-exports for compatibility.
 */
export {
  DEMO_NOTICE,
  DEMO_ORG,
  DEMO_PROPERTY,
  STATUS_LABEL,
  statusChipClass,
  getDemoVendors,
  getDemoCounts,
  getDemoDocuments,
  getDemoExpirations,
  DEMO_WORKFLOW,
  getWorkflowStage,
} from '@/lib/marketing/data'

/** Lazy snapshots for modules that expect static arrays at import time. */
import {
  getDemoCounts,
  getDemoDocuments,
  getDemoExpirations,
  getDemoVendors,
} from '@/lib/marketing/data'

export const DEMO_COUNTS = getDemoCounts()
export const DEMO_VENDORS = getDemoVendors()
export const DEMO_DOCUMENTS = getDemoDocuments()
export const DEMO_EXPIRATIONS = getDemoExpirations(DEMO_VENDORS)
