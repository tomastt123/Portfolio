export type Rejected = { decision: string; why: string };
export type Figure = { value: string; label: string };

export type Project = {
  slug: string;
  numeris: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  cover?: string;
  images: string[];
  live?: { label: string; href: string };
  repo?: string;
  /** Short line for the index and for metadata. */
  summary: string;
  /** Long form. Only where there is something worth saying. */
  context?: string;
  constraints?: string[];
  rejected?: Rejected[];
  figures?: Figure[];
  /** Short form for older work. */
  features?: string[];
  /** Whether the live engine runs on the page. */
  demo?: boolean;
};

export const projects: Project[] = [
  {
    slug: "vardiklis",
    numeris: "01",
    title: "Vardiklis",
    tagline:
      "Maths diagnostics that walks a gap backwards through the dependency chain and names the year it started.",
    year: "2025—2026",
    role: "Sole author. Architecture, engine, content.",
    stack: ["TypeScript", "Next.js", "Payload CMS", "KaTeX", "SQLite"],
    cover: "/images/vardiklis-og.png",
    images: ["/images/vardiklis-og.png", "/images/vardiklis-logo.png"],
    live: { label: "vardiklis.lt", href: "https://vardiklis.lt/" },
    repo: "https://github.com/Vardiklis/vardiklis",
    demo: true,
    summary:
      "A problem generator for years 1–10 with its own audit, seeded randomness and a topic dependency graph.",
    context:
      "A parent can tell their child is struggling with maths. They cannot tell where. The school reports a grade, not a cause. And the gap is almost never where it shows up — a fourteen-year-old stuck on equations usually stopped understanding fractions at eleven. Vardiklis treats that as a graph problem. Every topic records what it rests on, and the diagnostic walks those edges backwards until it hits the first broken link.",
    constraints: [
      "No database for results, no login, no analytics. Nothing a child does is stored anywhere. That is a decision about children's data, not a technical limit.",
      "Problems are generated, not written down. A fixed set gets memorised, and a teacher needs a fresh variant for every class.",
      "Every generated problem has to be usable without a human checking it first. An ugly denominator or a broken formula goes straight to a child.",
      "A link to variant 7 has to return the same sheet every time. Otherwise a teacher cannot go back to it.",
    ],
    rejected: [
      {
        decision: "A database of problems",
        why: "Every fix would mean migrations and a content editor. A generator is code, and code can be tested. Rows cannot.",
      },
      {
        decision: "Math.random everywhere",
        why: "Fine for the website, useless for the PDF library. Five lines of mulberry32 behind a switchable stream solved both: the site runs on real randomness, the PDF generator runs the same code seeded.",
      },
      {
        decision: "Three difficulty levels",
        why: "The third one went and its best shapes moved down into the second — spot the error, work backwards. Three sounded better. In practice the middle one was empty.",
      },
      {
        decision: "One difficulty knob",
        why: "It controlled the shape of the problem and the size of the numbers at once, so a six-year-old pressing Hard got numbers up to 10,000. Now three separate things: level sets the shape, year sets the scale, range sets a ceiling no number can cross.",
      },
      {
        decision: "Importing generators straight into the year page",
        why: "The client component needed one type and one number. That import was enough to ship all 2.5 MB of the generator library to the browser on first paint. Shared types moved into a file that imports nothing heavy.",
      },
    ],
    figures: [
      { value: "100+", label: "problem generators" },
      { value: "104", label: "curriculum points, years 1–10" },
      { value: "2.5 MB", label: "library kept out of first paint" },
      { value: "0", label: "external services or API keys" },
    ],
  },
  {
    slug: "baltic-gastro-summit",
    numeris: "02",
    title: "Baltic Gastro Summit",
    tagline: "Site for the largest gastronomy conference in the Baltics.",
    year: "2026",
    role: "Client project. Build and handover.",
    stack: ["WordPress", "Kadence", "Elementor", "PHP"],
    cover: "/images/gastro-main.webp",
    images: [
      "/images/gastro-main.webp",
      "/images/gastro-2.jpg",
      "/images/gastro-3.jpg",
      "/images/gastro-4.webp",
    ],
    live: { label: "gastrosummit.eu", href: "https://gastrosummit.eu/" },
    summary:
      "Two days at Dūmų fabrikas in Vilnius: programme, speakers, partners and ticketing, all editable by the organisers.",
    features: [
      "Programme and speaker pages the organisers update themselves, with no developer in the loop",
      "Partner and sponsor logos arranged by tier",
      "Photo galleries carried over from previous years",
      "Built on Kadence and Elementor because the team has to keep editing it long after I stop",
    ],
  },
  {
    slug: "ticketly",
    numeris: "03",
    title: "Ticketly",
    tagline: "Ticketing for teams, with the AI doing the repetitive part.",
    year: "2025",
    role: "Design and build",
    stack: ["React", "JavaScript", "AI", "CSS"],
    cover: "/images/ticketly-main.jpg",
    images: [
      "/images/ticketly-main.jpg",
      "/images/ticketlyphoto2.jpg",
      "/images/ticketlyphoto3.jpg",
      "/images/ticketlyphoto4.jpg",
    ],
    live: { label: "ticketly.uk", href: "https://ticketly.uk/" },
    summary:
      "Teams open, assign and close tickets in one place. The AI suggests fixes and clears the work nobody wants to do twice.",
    features: [
      "Assign and track tickets in real time",
      "Attach files to the ticket instead of emailing them around",
      "AI suggestions and automation for repeated actions",
      "An interface the non-technical half of a team will actually use",
    ],
  },
  {
    slug: "hotel-management",
    numeris: "04",
    title: "Hotel Management System",
    tagline: "Desktop software for the daily running of a hotel.",
    year: "2023",
    role: "Engineering",
    stack: ["C++", "MySQL"],
    cover: "/images/hotelmanagementsystem.png",
    images: [
      "/images/hotelmanagementsystem.png",
      "/images/hotelmanagementsystem2.png",
      "/images/hotelmanagementsystem3.png",
    ],
    repo: "https://github.com/tomastt123/Hotel-Management-System",
    summary:
      "Room bookings, check-in and check-out, and billing in one C++ program on MySQL.",
    features: [
      "Room reservation and booking",
      "Guest records in one place",
      "Live room availability",
      "Billing and financial reports",
    ],
  },
  {
    slug: "trakai-castle",
    numeris: "05",
    title: "Trakai Castle",
    tagline: "A redesign built around the photography rather than around the menu.",
    year: "2024",
    role: "Design and front-end",
    stack: ["React", "JavaScript", "HTML", "CSS"],
    cover: "/images/trakai1.1.png",
    images: [
      "/images/trakai1.1.png",
      "/images/trakai1.2.png",
      "/images/trakai1.3.png",
      "/images/trakai1.4.png",
    ],
    repo: "https://github.com/tomastt123/Trakaiweb",
    summary:
      "A full redesign of the Trakai Castle site — faster, quieter, and led by the pictures.",
    features: [
      "Holds up from a phone to a wide desktop",
      "Minimal layout so the photographs come first",
      "Fast on every page",
      "Component-driven React",
    ],
  },
  {
    slug: "carokie",
    numeris: "06",
    title: "Carokie",
    tagline: "A car parts and accessories shop.",
    year: "2023",
    role: "Client project. Design and build.",
    stack: ["Shopify", "JavaScript", "CSS", "HTML"],
    cover: "/images/1.1.jpeg",
    images: [
      "/images/1.1.jpeg",
      "/images/carokie1.1.jpeg",
      "/images/carokie1.2.jpeg",
      "/images/carokie1.3.jpeg",
      "/images/carokie1.5.jpeg",
    ],
    summary:
      "Shopify underneath, a custom front-end on top, designed for people shopping on a phone in a garage.",
    features: [
      "Full checkout through Shopify",
      "Filtering and search across the catalogue",
      "Secure payment handling",
      "Mobile-first throughout",
    ],
  },
  {
    slug: "seo-mages",
    numeris: "07",
    title: "SEO Mages",
    tagline: "A marketing site for an SEO startup.",
    year: "2023",
    role: "Client project. Design and build.",
    stack: ["WordPress", "JavaScript", "CSS", "HTML"],
    cover: "/images/seo1.1.jpeg",
    images: [
      "/images/seo1.1.jpeg",
      "/images/seo1.2.jpeg",
      "/images/seo1.3.jpeg",
      "/images/seo1.4.png",
    ],
    summary:
      "A site for an SEO startup, with WordPress behind it so the team ships content without asking a developer.",
    features: [
      "Design made for the SEO industry, not a generic template",
      "Responsive across every size",
      "WordPress content management",
      "Tuned for load speed and search",
    ],
  },
];

export const clients = [
  { name: "Baltic Gastro Summit", logo: "/images/gastro-logo.png" },
  { name: "SEO Mages", logo: "/images/seomages.svg" },
  { name: "Carokie", logo: "/images/carokie.png" },
  { name: "Girniukas", logo: "/images/girniukas.png" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
