import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createGrowingTip } from "../actions";
import { GrowingTipForm } from "../growing-tip-form";

export const metadata: Metadata = { title: "New Growing Tip — Admin" };

export default function NewGrowingTipPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/growing-tips" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Growing Tips
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">New Growing Tip</h1>
      </div>
      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <GrowingTipForm action={createGrowingTip} />
        </CardContent>
      </Card>
    </div>
  );
}
