export default function EducationSection() {
  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Education
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h3 className="font-semibold text-paper-text">
            Pilar Colleges of Zamboanga City, Inc.
          </h3>
          <p className="text-paper-text italic">B.S. in Information Technology</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-paper-text">Zamboanga City, Philippines</p>
          <p className="text-sm text-paper-text">April 2021 – April 2025</p>
        </div>
      </div>
      <ul className="mt-2 list-disc list-inside text-sm text-paper-text space-y-1">
        <li>
          <span className="font-semibold">Concentrations:</span> Software Engineering and Full-Stack Development
        </li>
        <li>
          <span className="font-semibold">Honors:</span> Proficiency Award (OWWA Internship)
        </li>
        <li>
          <span className="font-semibold">Related Coursework:</span> Software Engineering, Web Development, Database Management, System Analysis &amp; Design, API Development, Systems Integration
        </li>
      </ul>
    </section>
  );
}
