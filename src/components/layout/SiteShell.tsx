import type { ReactNode } from "react";
import { CursorWave } from "@/components/motion/CursorWave";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CursorWave />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
