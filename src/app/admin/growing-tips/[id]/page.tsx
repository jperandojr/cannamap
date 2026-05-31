import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { GrowingTip } from "@/lib/types";
import { updateGrowingTip } from "../actions";
import { GrowingTipForm } from "../growing-tip-form";

export const metadata: Metadata = { title: "Edit Growing Tip — Admin" };

interface Props { params: Promise<{ id: string }> }

export default async function EditGrowingTipPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("growing_tips").select("*").eq("id", id).single();
  if (!data) notFound();

  const tip = data as GrowingTip;
  const action = updateGrowingTip.bind(null, id);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/growing-tips" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" /> Back to Growing Tips
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit Growing Tip</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{tip.title}</p>
      </div>
      <Card className="max-w-3xl">
        <CardContent className="p-6">
          <GrowingTipForm action={action} initialData={tip} />
        </CardContent>
      </Card>
    </div>
  );
}
