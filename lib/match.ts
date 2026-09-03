/**
 * Paste a job ad, get a table back: requirement, the specific thing I did that
 * covers it, or an honest gap.
 *
 * There is deliberately no LLM here. A model call would mean an API key, a
 * server and a per-visit cost, and it would land in the same place: job ads
 * are written in a small, predictable vocabulary that a synonym map handles.
 * Everything runs in the browser, so nothing anyone pastes ever leaves it.
 */

export type Evidence = {
  /** What I actually did. Not "used X" but what came out of it. */
  text: string;
  /** Project slug, when the evidence can be opened. */
  project?: string;
};

export type Skill = {
  id: string;
  name: string;
  /** What ads call it. Written lowercase, without diacritics. */
  aliases: string[];
  evidence: Evidence[];
};

export const SKILLS: Skill[] = [
  {
    id: "typescript",
    name: "TypeScript",
    aliases: ["typescript", " ts ", "typed", "type safety"],
    evidence: [
      {
        text: "Vardiklis: over a hundred generators where the type is the contract. A generator cannot assemble a problem itself, only hand back a draft for the factory to finish and normalise.",
        project: "vardiklis",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    aliases: ["react", "reactjs", "hooks", "jsx", "frontend", "front-end", "front end"],
    evidence: [
      { text: "Vardiklis, Ticketly, Trakai Castle and this page.", project: "vardiklis" },
      {
        text: "The inspect layer here writes pointer position straight to the DOM inside requestAnimationFrame instead of through state. Through state the crosshair visibly lags.",
      },
    ],
  },
  {
    id: "next",
    name: "Next.js",
    aliases: ["next.js", "nextjs", "next js", "app router", "ssr", "ssg", "server components"],
    evidence: [
      {
        text: "Vardiklis is a static Next.js site with no database and no API keys. So is this portfolio.",
        project: "vardiklis",
      },
    ],
  },
  {
    id: "csharp",
    name: "C# / .NET",
    aliases: ["c#", "csharp", ".net", "dotnet", "asp.net", "asp net", "entity framework"],
    evidence: [
      {
        text: "A to-do web application on ASP.NET Core with SQL storage: create, edit and delete tasks, persisted across sessions.",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL and databases",
    aliases: ["sql", "mysql", "postgres", "postgresql", "sqlite", "database", "relational"],
    evidence: [
      {
        text: "Hotel management system on MySQL: reservations, live room availability, billing reports.",
        project: "hotel-management",
      },
      { text: "SQLite behind Payload CMS in Vardiklis.", project: "vardiklis" },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    aliases: ["c++", "cpp"],
    evidence: [
      {
        text: "The hotel management system is C++ over MySQL, written as desktop software rather than a web app.",
        project: "hotel-management",
      },
    ],
  },
  {
    id: "architecture",
    name: "Architecture and system design",
    aliases: ["architect", "system design", "design patterns", "modular", "scalab", "technical lead"],
    evidence: [
      {
        text: "Vardiklis splits into three layers: seed, generator, audit. Difficulty, year scale and number range were pulled apart into separate parameters after one combined knob handed six-year-olds numbers up to 10,000.",
        project: "vardiklis",
      },
      {
        text: "A topic dependency graph with cycle detection. The diagnostic walks the edges backwards until it reaches the first break.",
        project: "vardiklis",
      },
    ],
  },
  {
    id: "testing",
    name: "Testing and quality",
    aliases: ["test", "qa", "quality", "unit", "integration", "ci/cd", " ci ", "automation"],
    evidence: [
      {
        text: "An audit that generates a hundred problems per generator per level and checks for ugly denominators, broken KaTeX, unhandled sign pairs and graph integrity. It runs on this site.",
        project: "vardiklis",
      },
      {
        text: "Set diversity is measured by template rather than string equality. Ten problems of the same shape are one problem to a student, and exact comparison cannot see that.",
        project: "vardiklis",
      },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    aliases: ["performance", "optimis", "optimiz", "bundle", "lighthouse", "core web vitals", "speed"],
    evidence: [
      {
        text: "2.5 MB of generator library was reaching the browser on first paint because a client component imported one constant from it. Shared types moved into a file that imports nothing heavy.",
        project: "vardiklis",
      },
    ],
  },
  {
    id: "ai",
    name: "AI and LLMs",
    aliases: ["ai", "artificial intelligence", "llm", "gpt", "machine learning", " ml ", "agent", "prompt"],
    evidence: [
      {
        text: "Ticketly: AI suggestions and automation inside the ticket flow rather than in a separate chat window.",
        project: "ticketly",
      },
      {
        text: "This tool has no model in it on purpose. Job ads reuse a small vocabulary, so a synonym map returns the same answer with no API key and no data leaving the browser.",
      },
    ],
  },
  {
    id: "cms",
    name: "CMS and PHP",
    aliases: ["cms", "wordpress", "php", "payload", "strapi", "headless", "content management"],
    evidence: [
      {
        text: "WordPress for Baltic Gastro Summit, SEO Mages and Girniukas. In every case the client keeps publishing after I leave.",
        project: "baltic-gastro-summit",
      },
      { text: "Payload CMS for the Vardiklis articles.", project: "vardiklis" },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    aliases: ["e-commerce", "ecommerce", "shopify", "woocommerce", "online store", "checkout", "payment"],
    evidence: [
      {
        text: "Carokie: a car parts shop on Shopify with a custom front-end, built for people shopping on a phone.",
        project: "carokie",
      },
    ],
  },
  {
    id: "seo",
    name: "SEO and marketing",
    aliases: ["seo", "marketing", "analytics", "conversion", "growth", "content"],
    evidence: [
      {
        text: "SEO Mages. I came into programming from digital marketing, so I read the copy on a page as carefully as the component that renders it.",
        project: "seo-mages",
      },
    ],
  },
  {
    id: "ux",
    name: "UX and accessibility",
    aliases: ["ux", " ui ", "accessib", "a11y", "wcag", "design", "figma", "keyboard"],
    evidence: [
      {
        text: "This page: full keyboard navigation through the command bar, visible focus rings, prefers-reduced-motion respected, and an inspect mode that reports real measurements rather than decorative ones.",
      },
    ],
  },
  {
    id: "git",
    name: "Git",
    aliases: ["git", "github", "gitlab", "version control", "code review", "pull request"],
    evidence: [{ text: "Everything above sits in public repositories." }],
  },
];

/**
 * What I do not have. Stated plainly, because a requirement I cannot meet is
 * useful information for both sides rather than something to bury.
 */
export const GAPS: { name: string; aliases: string[] }[] = [
  { name: "Docker and Kubernetes", aliases: ["docker", "kubernetes", "k8s", "container"] },
  { name: "AWS, Azure or GCP", aliases: ["aws", "azure", " gcp ", "cloud infrastructure", "terraform"] },
  { name: "Java", aliases: ["java ", "java,", "spring boot", "kotlin"] },
  { name: "Python", aliases: ["python", "django", "flask", "pandas", "numpy"] },
  { name: "Native mobile", aliases: ["ios", "android", "swift", "flutter", "react native"] },
  { name: "Go or Rust", aliases: ["golang", " go ", "rust"] },
];

export type Hit = {
  skill: Skill;
  /** Which phrases matched, so the reader can see why. */
  phrases: string[];
};

export type MatchResult = {
  hits: Hit[];
  gaps: string[];
  /** True once the input is long enough to be worth reading. */
  ready: boolean;
};

/** Diacritics are dropped so Lithuanian ads match the English alias list. */
function flatten(text: string): string {
  return ` ${text
    .toLowerCase()
    .replace(/[ąčęėįšųūž]/g, (c) => "aceeisuuz"["ąčęėįšųūž".indexOf(c)])
    .replace(/\s+/g, " ")} `;
}

export function match(ad: string): MatchResult {
  const t = flatten(ad);
  if (t.trim().length < 40) return { hits: [], gaps: [], ready: false };

  const hits: Hit[] = [];
  for (const skill of SKILLS) {
    const phrases = skill.aliases.filter((a) => t.includes(a));
    if (phrases.length > 0) hits.push({ skill, phrases });
  }

  const gaps = GAPS.filter((g) => g.aliases.some((a) => t.includes(a))).map((g) => g.name);

  return { hits, gaps, ready: true };
}
