import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashy G. Toledo | Digital Experiences Beyond Orbit",
  description: "The portfolio of Ashy G. Toledo — UI/UX Designer, BS Information Technology Student, and future web developer.",
  keywords: ["UI/UX designer", "web developer", "portfolio", "Ashy Toledo"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
