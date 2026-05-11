import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "indica" | "sativa" | "hybrid" | "outline" | "success";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]":
            variant === "default",
          "bg-purple-500/20 text-purple-400 border border-purple-500/30":
            variant === "indica",
          "bg-green-500/20 text-green-400 border border-green-500/30":
            variant === "sativa",
          "bg-blue-500/20 text-blue-400 border border-blue-500/30":
            variant === "hybrid",
          "border border-[var(--border)] text-[var(--foreground)] bg-transparent":
            variant === "outline",
          "bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30":
            variant === "success",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
