export default function ActivitiesSection() {
  return (
    <section>
      <h2 className="text-lg font-bold uppercase tracking-wider text-paper-text font-mono border-b-2 border-paper-text pb-1 mb-3">
        Activities and Leadership
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h3 className="font-semibold text-paper-text">
            Zamboanga Youth Movement Association (Sports)
          </h3>
          <p className="italic text-paper-text">Executive Director</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-paper-text sm:text-right">Zamboanga City, Philippines</p>
          <p className="text-sm text-paper-text sm:text-right">2024 – 2025</p>
        </div>
      </div>
      <ul className="mt-2 list-disc list-inside text-sm text-paper-text space-y-1">
        <li>Led sports-related youth initiatives and coordinated community engagement activities.</li>
        <li>Organized programs promoting leadership, teamwork, and active participation among youth members.</li>
      </ul>
    </section>
  );
}
