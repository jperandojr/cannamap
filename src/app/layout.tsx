import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/db";

export const metadata: Metadata = {
  title: {
    default: "GrowingWeed.com — Cannabis Directory",
    template: "%s | GrowingWeed.com",
  },
  description:
    "GrowingWeed.com — the complete cannabis directory. Find strains, dispensaries, seed banks, news and growing tips.",
  keywords: ["cannabis", "marijuana", "strains", "dispensaries", "seed banks", "growing tips"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const profile = user ? await getProfile(user.id) : null;
  const isAdmin = profile?.role === "admin";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header user={user} isAdmin={isAdmin} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
