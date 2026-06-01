import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Directory: [
    { href: "/strains", label: "Cannabis Strains" },
    { href: "/dispensaries", label: "Dispensaries" },
    { href: "/seed-banks", label: "Seed Banks" },
  ],
  Learn: [
    { href: "/news", label: "Cannabis News" },
    { href: "/growing-tips", label: "Growing Tips" },
    { href: "/growing-tips?difficulty=beginner", label: "Beginner Guides" },
  ],
  Company: [
    { href: "/submit", label: "Submit a Listing" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/advertise", label: "Advertise" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.webp" alt="GrowingWeed" width={379} height={41} className="h-8 w-auto max-w-full" style={{ width: "auto" }} />
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Your #1 source for cannabis strains, dispensaries, seed banks, news and growing guides.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} GrowingWeed.com. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)] text-center">
            Cannabis laws vary by location. Know your local laws. For adults 21+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
