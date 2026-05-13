import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createSeedBank } from "../actions";
import { SeedBankForm } from "../seed-bank-form";

export const metadata: Metadata = { title: "New Seed Bank — Admin" };

export default function NewSeedBankPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/seed-banks"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Seed Banks
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">New Seed Bank</h1>
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <SeedBankForm action={createSeedBank} />
        </CardContent>
      </Card>
    </div>
  );
}
