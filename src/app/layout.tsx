import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { company } from "@/data/company";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | B2B Animal Nutrition`,
    template: `%s | ${company.name}`,
  },
  description: company.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}