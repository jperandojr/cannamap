import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { Strain } from "@/lib/types";
import { updateStrain } from "../actions";
import { StrainForm } from "../strain-form";

export const metadata: Metadata = { title: "Edit Strain — Admin" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditStrainPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("strains").select("*").eq("id", id).single();
  if (!data) notFound();

  const strain = data as Strain;
  const action = updateStrain.bind(null, id);

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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Strain</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{strain.name}</p>
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <StrainForm action={action} initialData={strain} />
        </CardContent>
      </Card>
    </div>
  );
}
