"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileState } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const initial: ProfileState = { error: null, success: false };

export function ProfileForm({ currentUsername }: { currentUsername: string }) {
  const [state, action, pending] = useActionState(updateProfile, initial);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0" /> Username updated successfully.
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-xs font-medium text-[var(--muted)] mb-1.5">
          Username
        </label>
        <Input
          id="username"
          name="username"
          defaultValue={currentUsername}
          placeholder="your_username"
          autoComplete="username"
          minLength={2}
          maxLength={32}
        />
        <p className="text-xs text-[var(--muted)] mt-1.5">
          Letters, numbers, and underscores only.
        </p>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
