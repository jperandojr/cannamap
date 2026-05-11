import type { Metadata } from "next";
import Link from "next/link";
import { InboxIcon, Leaf, MapPin, Sprout, Newspaper, BookOpen, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminStats } from "@/lib/db";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const directoryStats = [
    { label: "Strains", value: stats.strains, icon: Leaf, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Dispensaries", value: stats.dispensaries, icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Seed Banks", value: stats.seedBanks, icon: Sprout, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Articles", value: stats.articles, icon: Newspaper, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Growing Tips", value: stats.tips, icon: BookOpen, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  const submissionStats = [
    { label: "Pending", value: stats.submissions.pending, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Approved", value: stats.submissions.approved, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Rejected", value: stats.submissions.rejected, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Site overview and pending actions.</p>
      </div>

      {/* Submissions summary */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Submissions</h2>
          <Link href="/admin/submissions" className="text-xs text-[var(--primary)] hover:underline">
            Manage →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {submissionStats.map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--foreground)]">{value}</div>
                  <div className="text-xs text-[var(--muted)]">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Directory counts */}
      <section>
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Directory</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {directoryStats.map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="p-5 text-center">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="text-xl font-bold text-[var(--foreground)]">{value}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {stats.submissions.pending > 0 && (
        <div className="mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {stats.submissions.pending} submission{stats.submissions.pending !== 1 ? "s" : ""} awaiting review
              </p>
              <p className="text-xs text-[var(--muted)]">Review and respond to listing submissions.</p>
            </div>
          </div>
          <Link
            href="/admin/submissions?status=pending"
            className="shrink-0 text-xs font-medium text-yellow-600 hover:underline"
          >
            Review now →
          </Link>
        </div>
      )}
    </div>
  );
}
