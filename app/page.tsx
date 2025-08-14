"use client";

import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import ExperienceSection from '@/components/sections/experience-section';
import ContactSection from '@/components/sections/contact-section';
import ProjectModal from '@/components/project-modal';
import { ProjectProvider } from '@/contexts/project-context';

export default function Home() {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <ProjectModal />
      </div>
    </ProjectProvider>
  );
}