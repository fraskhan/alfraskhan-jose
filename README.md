# Al-Fraskhan A. Jose — Portfolio

A one-page portfolio website designed to look like a word processor (Microsoft Word / Google Docs), built with Next.js 14+, React, TypeScript, and Tailwind CSS. Features a dark/light mode toggle and a responsive "paper" layout.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Static Export

```bash
npm run build
```

The static export will be generated in the `dist/` directory, ready for deployment to any static hosting provider.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- next-themes (dark/light mode)
- lucide-react (icons)

## Features

- Word processor-style UI with centered "paper" card, toolbar, and ruler
- Dark / light mode toggle with instant switching
- All content sections: Header, Education, Experience, Projects, Activities, Skills, Seminars, Achievements
- Responsive design: paper fills the screen on mobile with shrinking margins
- Clickable links (email, phone, LinkedIn, GitHub, Portfolio)
- Serif typography for body text, monospace/sans-serif for headings
- Subtle paper texture and page number footer

## Deploy on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new) connected to your repository.
