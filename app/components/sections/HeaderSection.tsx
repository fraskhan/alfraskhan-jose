export default function HeaderSection() {
  return (
    <section className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-paper-text font-mono uppercase">
        Al-Fraskhan A. Jose
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-paper-text flex flex-wrap justify-center items-center gap-x-1 gap-y-0.5 px-2">
        <span>Kasanyangan, Zamboanga City, Philippines</span>
        <span className="hidden xs:inline">|</span>
        <a href="mailto:alfraskhanj@gmail.com" className="text-link hover:underline">
          alfraskhanj@gmail.com
        </a>
        <span>|</span>
        <a href="tel:+639650348702" className="text-link hover:underline">
          (+63) 965-034-8702
        </a>
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
        <a
          href="https://www.linkedin.com/in/alfraskhan-jose-22b6b6358"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/fraskhan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://fras-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline"
        >
          Portfolio
        </a>
      </div>
    </section>
  );
}
