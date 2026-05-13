import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { SeedBank } from "@/lib/types";
import { updateSeedBank } from "../actions";
import { SeedBankForm } from "../seed-bank-form";

export const metadata: Metadata = { title: "Edit Seed Bank — Admin" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSeedBankPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("seed_banks").select("*").eq("id", id).single();
  if (!data) notFound();

  const seedBank = data as SeedBank;
  const action = updateSeedBank.bind(null, id);

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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Seed Bank</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{seedBank.name}</p>
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <SeedBankForm action={action} initialData={seedBank} />
        </CardContent>
      </Card>
    </div>
  );
}
