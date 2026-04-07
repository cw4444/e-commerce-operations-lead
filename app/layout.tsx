import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal Forge",
  description: "An agentic e-commerce operations copilot for brand performance, listings, compliance, and growth."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
