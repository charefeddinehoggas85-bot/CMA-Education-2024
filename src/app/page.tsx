import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedFormationsSection from '@/components/sections/FeaturedFormationsSection'
import FeaturedFormatorsSection from '@/components/sections/FeaturedFormatorsSection'
import FeaturedPartnersSection from '@/components/sections/FeaturedPartnersSection'
import ContactSection from '@/components/sections/ContactSection'
import AccessibilityBanner from '@/components/sections/AccessibilityBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedFormationsSection />
      <FeaturedFormatorsSection />
      <FeaturedPartnersSection />
      <ContactSection />
      <AccessibilityBanner />
    </>
  )
}
