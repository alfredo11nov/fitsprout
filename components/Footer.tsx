"use client";
import { LanguageToggle, useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="max-w-5xl mx-auto px-5 py-8 flex flex-col items-center gap-3">
      <LanguageToggle />
      <div className="text-center text-xs text-gray-400">
        {t("FitSprout MVP · For SG/MY · Educational use — not medical advice.")}
      </div>
    </footer>
  );
}
