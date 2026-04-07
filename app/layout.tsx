import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal Forge",
  description: "An agentic e-commerce operations copilot for brand performance, listings, compliance, and growth."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <Link href="/" className="topbar-brand">Signal Forge</Link>
            <nav className="topbar-nav">
              <Link href="/">Dashboard</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
