import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {icon}
          </div>
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors",
              className
            )}
            {...props}
          />
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
