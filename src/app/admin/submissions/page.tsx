import type { Metadata } from "next";
import { Suspense } from "react";
import { Building2, Sprout, Clock, CheckCircle, XCircle, Globe, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSubmissions } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { StatusTabs } from "./status-tabs";
import { SubmissionActions } from "./submission-actions";

export const metadata: Metadata = { title: "Submissions — Admin" };

interface Props {
  searchParams: Promise<{ status?: string }>;
}

const statusBadge: Record<string, { variant: "success" | "default" | "outline"; icon: React.ElementType }> = {
  pending: { variant: "default", icon: Clock },
  approved: { variant: "success", icon: CheckCircle },
  rejected: { variant: "outline", icon: XCircle },
};

export default async function AdminSubmissionsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const submissions = await getSubmissions(status ?? "all");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Submissions</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Review listing submissions from users.</p>
      </div>

      <Suspense>
        <StatusTabs />
      </Suspense>

      {submissions.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-lg font-medium mb-1">No submissions</p>
          <p className="text-sm">Nothing here yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => {
            const { variant, icon: StatusIcon } = statusBadge[sub.status] ?? statusBadge.pending;
            const TypeIcon = sub.type === "dispensary" ? Building2 : Sprout;

            return (
              <Card key={sub.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center shrink-0">
                        <TypeIcon className="h-5 w-5 text-[var(--primary)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-[var(--foreground)]">{sub.name}</h3>
                          <Badge variant="default" className="capitalize">{sub.type.replace("_", " ")}</Badge>
                          <Badge variant={variant}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {sub.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">{sub.description}</p>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                          {sub.city && sub.state && (
                            <span>{sub.city}, {sub.state}</span>
                          )}
                          {sub.country && !sub.city && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" /> {sub.country}
                            </span>
                          )}
                          {sub.website && (
                            <a href={sub.website} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-[var(--primary)] transition-colors">
                              <Globe className="h-3 w-3" /> {sub.website.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {sub.contact_email}
                          </span>
                          <span>{formatDate(sub.created_at)}</span>
                        </div>

                        {sub.notes && (
                          <p className="mt-3 text-xs text-[var(--muted)] bg-[var(--surface-hover)] rounded-lg px-3 py-2 italic">
                            &ldquo;{sub.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {sub.status === "pending" && (
                      <SubmissionActions id={sub.id} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
