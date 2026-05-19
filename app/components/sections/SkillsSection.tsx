export default function SkillsSection() {
  const skills = [
    {
      category: "Programming & Development",
      items: "Java, PHP, VB.NET, JavaScript, TypeScript, HTML, CSS, React.js, Next.js, React Native",
    },
    {
      category: "Backend & Databases",
      items: "Django, Flask, REST APIs, MySQL, PostgreSQL, Supabase",
    },
    {
      category: "Tools & Platforms",
      items: "Git, Vercel, Expo, VS Code, PyCharm",
    },
    {
      category: "Core Competencies",
      items: "Full-Stack Development, System Design, API Integration, Multi-tenant Architecture, Database Management, Responsive Web Development",
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-semibold text-sm text-paper-text mb-1">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.split(", ").map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2 py-0.5 text-xs rounded border border-divider bg-background text-paper-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
