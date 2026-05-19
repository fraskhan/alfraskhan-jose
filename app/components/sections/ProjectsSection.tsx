export default function ProjectsSection() {
  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Projects
      </h2>

      {/* Project 1 */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="font-semibold text-paper-text">
            Multi-Organization Employee Time &amp; Attendance Management System
          </h3>
          <p className="text-sm text-paper-text">Personal Project</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-1">
          <p className="italic text-paper-text">Full-Stack Developer</p>
          <p className="text-sm text-paper-text">2025 – Present</p>
        </div>
        <p className="text-sm text-paper-text mt-1">
          <span className="font-semibold">Repository:</span> attendance-tracking-system
        </p>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Developed a multi-tenant SaaS attendance management platform with secure employee time tracking and photo verification.</li>
          <li>Built a cross-platform mobile application using React Native and Expo for employee attendance logging and history tracking.</li>
          <li>Developed an admin dashboard using Next.js and TypeScript for employee management, reporting, and attendance verification.</li>
          <li>Implemented PostgreSQL Row Level Security (RLS) for strict organization-based data isolation and secure multi-tenant architecture.</li>
          <li>Integrated Supabase Authentication, PostgreSQL database services, and cloud storage with access policies and signed URLs.</li>
          <li>Designed scalable backend workflows using JWT authentication and role-based access control.</li>
          <li>Applied structured testing approaches using Jest and property-based testing methodologies.</li>
        </ul>
      </div>

      {/* Project 2 */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="font-semibold text-paper-text">
            Real-Time Web Chat Application
          </h3>
          <p className="text-sm text-paper-text">Personal Project</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-1">
          <p className="italic text-paper-text">Developer</p>
          <p className="text-sm text-paper-text">April 2024</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Developed a real-time chat platform with user authentication and session management.</li>
          <li>Implemented frontend-backend communication for dynamic live messaging functionality.</li>
          <li>Designed responsive interfaces and optimized real-time user interactions.</li>
        </ul>
      </div>

      {/* Project 3 */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="font-semibold text-paper-text">
            Inventory Management System
          </h3>
          <p className="text-sm text-paper-text">Internship Project</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-1">
          <p className="italic text-paper-text">Developer</p>
          <p className="text-sm text-paper-text">2025</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Developed an inventory and asset tracking system to automate monitoring and reporting processes.</li>
          <li>Designed backend logic and database workflows to improve data organization and accessibility.</li>
          <li>Improved accuracy and efficiency of inventory management operations through digitalization.</li>
        </ul>
      </div>
    </section>
  );
}
