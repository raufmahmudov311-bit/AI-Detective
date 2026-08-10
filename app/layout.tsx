import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Detective — Solve the Case",
  description:
    "Investigate fictional murder cases. Study the suspects, question the evidence, and name the culprit. A new case every day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Special+Elite&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="bg-cork-darker text-paper font-sans min-h-screen">
        <div className="cork-bg min-h-screen">{children}</div>
      </body>
    </html>
  );
}
