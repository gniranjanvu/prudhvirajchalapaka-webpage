import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
