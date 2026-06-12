import "./globals.css";
import type { Metadata } from "next";
import { LangProvider } from "@/lib/i18n";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitSprout 🌱 — Learn fitness by doing",
  description: "Calories, protein & carbs tracker for SG/MY. Pick a goal, log food, see what your body actually needs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-display min-h-screen">
        <LangProvider>
          <main className="max-w-5xl mx-auto px-5 pt-6 pb-6">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
