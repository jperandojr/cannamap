import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]":
              variant === "primary",
            "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]":
              variant === "secondary",
            "hover:bg-[var(--surface)] text-[var(--foreground)]": variant === "ghost",
            "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]":
              variant === "outline",
            "bg-[var(--destructive)] text-white hover:opacity-90":
              variant === "destructive",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
