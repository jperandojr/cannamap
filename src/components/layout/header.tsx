"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Menu, X, Leaf, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/strains", label: "Strains" },
  { href: "/dispensaries", label: "Dispensaries" },
  { href: "/seed-banks", label: "Seed Banks" },
  { href: "/news", label: "News" },
  { href: "/growing-tips", label: "Growing Tips" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[var(--foreground)]">
              Cannamap
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4">
            <Input
              placeholder="Search strains, dispensaries, news..."
              icon={<Search className="h-4 w-4" />}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)]">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-[var(--primary)] bg-[var(--primary)]/10"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-[var(--border)] mt-2">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" className="flex-1">
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
