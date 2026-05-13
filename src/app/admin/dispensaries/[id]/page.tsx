import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Dispensary } from "@/lib/types";
import { updateDispensary } from "../actions";
import { DispensaryForm } from "../dispensary-form";

export const metadata: Metadata = { title: "Edit Dispensary — Admin" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditDispensaryPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("dispensaries").select("*").eq("id", id).single();
  if (!data) notFound();

  const dispensary = data as Dispensary;
  const action = updateDispensary.bind(null, id);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/dispensaries"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dispensaries
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Dispensary</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{dispensary.name}</p>
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <DispensaryForm action={action} initialData={dispensary} />
        </CardContent>
      </Card>
    </div>
  );
}
