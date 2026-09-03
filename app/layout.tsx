import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import DraftingLayer from "@/components/DraftingLayer";
import Palette from "@/components/Palette";
import Nav from "@/components/Nav";
import { asset } from "@/lib/asset";
import Footer from "@/components/Footer";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const barlowCond = Barlow_Condensed({
  variable: "--font-barlow-cond",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

// Pakeisti į tikrą domeną, kai jis bus nukreiptas į Vercel.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomastt.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Tomas Tvarijonavičius — Software Engineer",
    template: "%s — Tomas Tvarijonavičius",
  },
  description:
    "Software engineer in Vilnius. Maths problem generators, ticketing tools and client sites, with the working parts left visible.",
  authors: [{ name: "Tomas Tvarijonavičius" }],
  icons: { icon: asset("/images/favicon.png") },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE,
    siteName: "Tomas Tvarijonavičius",
    title: "Tomas Tvarijonavičius — Software Engineer",
    description:
      "Software engineer in Vilnius. Maths problem generators, ticketing tools and client sites.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DraftingLayer />
        <Palette />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
