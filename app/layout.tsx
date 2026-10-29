import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vetal Sand Solutions | Reliable Sand Solutions & Industrial Mineral Supply",
  description: "Specialized supplier of high-purity industrial silica sand, foundry core sand, and water filtration aggregates based in Gadhinglaj, Maharashtra.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
