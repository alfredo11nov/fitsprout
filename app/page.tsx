"use client";
import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  return <Suspense fallback={<div className="card">Loading…</div>}><AppShell /></Suspense>;
}
