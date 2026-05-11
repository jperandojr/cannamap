import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "GrowingWeed.com — Cannabis Directory",
    template: "%s | GrowingWeed.com",
  },
  description:
    "GrowingWeed.com — the complete cannabis directory. Find strains, dispensaries, seed banks, news and growing tips.",
  keywords: ["cannabis", "marijuana", "strains", "dispensaries", "seed banks", "growing tips"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
