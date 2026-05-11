"use client";

import { useTransition } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { updateSubmissionStatus } from "./actions";

export function SubmissionActions({ id }: { id: string }) {
  const [approving, startApprove] = useTransition();
  const [rejecting, startReject] = useTransition();

  return (
    <div className="flex gap-2 shrink-0">
      <button
        onClick={() => startApprove(() => updateSubmissionStatus(id, "approved"))}
        disabled={approving || rejecting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-green-500/10 text-green-700 border border-green-500/30 hover:bg-green-500/20 disabled:opacity-50 transition-colors"
      >
        {approving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle className="h-3.5 w-3.5" />}
        Approve
      </button>
      <button
        onClick={() => startReject(() => updateSubmissionStatus(id, "rejected"))}
        disabled={approving || rejecting}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-red-500/10 text-red-700 border border-red-500/30 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
      >
        {rejecting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
        Reject
      </button>
    </div>
  );
}
