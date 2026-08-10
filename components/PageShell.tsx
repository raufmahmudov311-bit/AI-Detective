"use client";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function PageShell({
  children,
  title,
  backHref,
}: {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <TopBar title={title} backHref={backHref} />
      <div className="flex-1">{children}</div>
      <BottomNav />
      <div className="h-16" />
    </div>
  );
}
