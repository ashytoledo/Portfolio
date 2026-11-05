import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Queen Ashley G. Toledo | Digital Experiences Beyond Orbit",
  description: "The portfolio of Queen Ashley G. Toledo — UI/UX Designer, BS Information Technology Student, and future web developer.",
  keywords: ["UI/UX designer", "web developer", "portfolio", "Ashley Toledo"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
