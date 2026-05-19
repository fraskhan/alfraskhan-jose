export default function SeminarsSection() {
  const seminars = [
    "Cyber Security SOC Level 2 (2024)",
    "Introduction to Node.js: A Backend Development Framework (2024)",
    "Operating System Basics (2024)",
    "ATOMIC DESIGN: Breaking the Designer-to-Developer Gap through Design Systems – Figma (2023)",
    "Creating User Interface with Adobe XD (2023)",
    "Web Development Seminar (2022)",
    "Deep Learning with Python (2022)",
    "IT Seminars – Pilar College of Zamboanga City, Inc. (2021–2024)",
  ];

  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Seminars &amp; Trainings
      </h2>
      <ul className="list-disc list-inside text-sm text-paper-text space-y-1">
        {seminars.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
