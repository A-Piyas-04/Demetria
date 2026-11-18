import type { ReactNode } from "react";
import { CursorInstrument } from "@/components/motion/CursorInstrument";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CursorInstrument />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
