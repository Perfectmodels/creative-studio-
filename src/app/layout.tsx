import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Creative Studio — The Open Creative Platform",
  description: "Create, edit and publish multimedia locally with an open-source creative workspace.",
  applicationName: "Creative Studio",
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { themeColor: "#090b10", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
