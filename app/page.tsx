import Toolbar from "./components/Toolbar";
import Ruler from "./components/Ruler";
import SectionDivider from "./components/SectionDivider";
import PageNumber from "./components/PageNumber";
import ProfilePhoto, { ProfilePhotoMobile } from "./components/ProfilePhoto";
import HeaderSection from "./components/sections/HeaderSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ActivitiesSection from "./components/sections/ActivitiesSection";
import SkillsSection from "./components/sections/SkillsSection";
import SeminarsSection from "./components/sections/SeminarsSection";
import AchievementsSection from "./components/sections/AchievementsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Toolbar */}
      <div className="sticky top-0 z-50">
        <Toolbar />
      </div>

      {/* Mobile profile strip — above the resume on small screens */}
      <div className="lg:hidden px-4">
        <ProfilePhotoMobile />
      </div>

      {/* Main layout: resume paper + desktop photo sidebar */}
      <div className="flex justify-center items-start gap-6 px-2 sm:px-4 pb-8">
        {/* ── Resume Paper ──────────────────────────────────────────── */}
        <div className="w-full max-w-[210mm] bg-paper shadow-lg rounded-sm border border-divider overflow-hidden transition-colors duration-300">
          <Ruler />

          {/* Document Body */}
          <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 paper-texture">
            <HeaderSection />
            <SectionDivider />
            <EducationSection />
            <SectionDivider />
            <ExperienceSection />
            <SectionDivider />
            <ProjectsSection />
            <SectionDivider />
            <ActivitiesSection />
            <SectionDivider />
            <SkillsSection />
            <SectionDivider />
            <SeminarsSection />
            <SectionDivider />
            <AchievementsSection />

            <PageNumber />
          </div>
        </div>

        {/* ── Profile Photo (right column, desktop only) ────────────── */}
        <ProfilePhoto />
      </div>
    </div>
  );
}
