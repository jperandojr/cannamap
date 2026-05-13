import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createStrain } from "../actions";
import { StrainForm } from "../strain-form";

export const metadata: Metadata = { title: "New Strain — Admin" };

export default function NewStrainPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/strains"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Strains
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">New Strain</h1>
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <StrainForm action={createStrain} />
        </CardContent>
      </Card>
    </div>
  );
}
