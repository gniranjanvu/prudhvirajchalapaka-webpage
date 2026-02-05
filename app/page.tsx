import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { 
  HeroSection, 
  ExperienceSection, 
  EducationSection,
  ProjectsSection,
  SkillsSection,
  AchievementsSection,
  PublicationsSection,
  ContactSection 
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <PublicationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
