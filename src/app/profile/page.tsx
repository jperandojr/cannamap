import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const profile = await getProfile(user.id);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-8">My Profile</h1>

      <div className="space-y-6">
        {/* Avatar + name header */}
        <Card>
          <CardContent className="p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 border-2 border-[var(--primary)]/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[var(--primary)]">
                {(profile?.username ?? user.email ?? "?")[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--foreground)]">
                {profile?.username ?? user.email?.split("@")[0]}
              </p>
              <p className="text-sm text-[var(--muted)]">{user.email}</p>
              <span className="inline-flex items-center gap-1 mt-1.5 text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <Shield className="h-3 w-3" />
                {profile?.role ?? "user"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Account info (read-only) */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Account Info</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[var(--muted)] shrink-0" />
                <div>
                  <p className="text-[var(--muted)] text-xs mb-0.5">Email</p>
                  <p className="text-[var(--foreground)]">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-[var(--muted)] shrink-0" />
                <div>
                  <p className="text-[var(--muted)] text-xs mb-0.5">Username</p>
                  <p className="text-[var(--foreground)]">{profile?.username ?? "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-[var(--muted)] shrink-0" />
                <div>
                  <p className="text-[var(--muted)] text-xs mb-0.5">Member since</p>
                  <p className="text-[var(--foreground)]">
                    {profile?.created_at ? formatDate(profile.created_at) : formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit username */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold text-[var(--foreground)] mb-1">Edit Profile</h2>
            <p className="text-xs text-[var(--muted)] mb-5">Update your display name.</p>
            <ProfileForm currentUsername={profile?.username ?? ""} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
