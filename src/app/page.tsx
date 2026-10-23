import { CapabilitiesSection } from '@/components/marketing/CapabilitiesSection'
import { FinalCTASection } from '@/components/marketing/FinalCTASection'
import { FragmentationSection } from '@/components/marketing/FragmentationSection'
import { HeroSection } from '@/components/marketing/HeroSection'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { PricingPreviewSection } from '@/components/marketing/PricingPreviewSection'
import { ProductProofSection } from '@/components/marketing/ProductProofSection'
import { ReadinessSection } from '@/components/marketing/ReadinessSection'
import { TeamSection } from '@/components/marketing/TeamSection'
import { WorkflowSection } from '@/components/marketing/WorkflowSection'

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <HeroSection />
        <ProductProofSection />
        <FragmentationSection />
        <CapabilitiesSection />
        <WorkflowSection />
        <ReadinessSection />
        <TeamSection />
        <PricingPreviewSection />
        <FinalCTASection />
      </main>
      <MarketingFooter />
    </>
  )
}
