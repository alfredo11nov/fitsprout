"use client";
import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";

// Share-URL entry point — opens directly into the food log view but keeps
// the Edit goal button + View-your-goal / Log-your-food toggle available.
export default function Log() {
  return <Suspense fallback={<div className="card">Loading…</div>}><AppShell initialView="log" skipSetup /></Suspense>;
}
