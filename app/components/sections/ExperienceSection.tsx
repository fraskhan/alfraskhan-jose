export default function ExperienceSection() {
  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Experience
      </h2>

      {/* Alt Business */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="font-semibold text-paper-text">Alt Business</h3>
          <p className="text-sm text-paper-text">Zamboanga Peninsula, Philippines</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-2">
          <p className="italic text-paper-text">Senior Information Technology Specialist</p>
          <p className="text-sm text-paper-text">Mar 2026 – Present</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Lead the development and management of full-stack business applications, company websites, and digital platforms supporting organizational growth and scalability.</li>
          <li>Architect and implement modern web solutions using React.js, TypeScript, and Next.js while overseeing backend integrations and API services.</li>
          <li>Drive technical decision-making focused on clean architecture, reusable components, maintainability, and long-term scalability.</li>
          <li>Improve platform performance, user experience, and development workflows across multiple software initiatives.</li>
          <li>Collaborate with teams and stakeholders to deliver scalable and business-driven digital solutions.</li>
        </ul>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-3">
          <p className="italic text-paper-text">IT Associate Independent Contractor</p>
          <p className="text-sm text-paper-text">Oct 2025 – Mar 2026</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Managed and supported multiple software and website projects for business operations.</li>
          <li>Developed frontend and backend features including dashboards, CMS functionality, and workflow-driven systems using React, Next.js, and TypeScript.</li>
          <li>Integrated APIs and backend services to streamline internal operations and improve system efficiency.</li>
          <li>Assisted in troubleshooting technical issues and implementing scalable software solutions aligned with business requirements.</li>
          <li>Maintained application stability and optimized system functionality across projects.</li>
        </ul>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-3">
          <p className="italic text-paper-text">Web Developer</p>
          <p className="text-sm text-paper-text">Jun 2025 – Sep 2025</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Developed and maintained responsive company websites and internal business web applications.</li>
          <li>Built reusable UI components and interactive interfaces using React and TypeScript.</li>
          <li>Ensured cross-device compatibility, responsiveness, and frontend performance optimization.</li>
          <li>Collaborated with teams to integrate APIs and improve overall website functionality.</li>
          <li>Focused on writing clean, maintainable, and scalable frontend code.</li>
        </ul>
      </div>

      {/* OWWA */}
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <h3 className="font-semibold text-paper-text">Overseas Workers Welfare Administration (OWWA)</h3>
          <p className="text-sm text-paper-text">Zamboanga City, Philippines</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mt-2">
          <p className="italic text-paper-text">Software Developer Intern</p>
          <p className="text-sm text-paper-text">Jan 2025 – Jun 2025</p>
        </div>
        <ul className="mt-1 list-disc list-inside text-sm text-paper-text space-y-1">
          <li>Developed an Inventory Management System using Python to automate inventory and asset tracking workflows.</li>
          <li>Designed database structures and backend logic for accurate record management and reporting.</li>
          <li>Collaborated with staff to gather system requirements and translate operational workflows into digital solutions.</li>
          <li>Improved operational efficiency by reducing manual handling and centralizing inventory processes.</li>
          <li>Assisted in troubleshooting and maintaining technical systems during deployment and implementation.</li>
        </ul>
      </div>
    </section>
  );
}
