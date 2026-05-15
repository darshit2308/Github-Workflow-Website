import { useEffect, useState } from "react";
import { NAV_SECTIONS } from "@/data/siteData";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Simple scroll spy
      const scrollY = window.scrollY + 160;
      let current: string | null = null;
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-smooth ${
        scrolled
          ? "border-b border-surface-border bg-white/80 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-3.5 md:px-12">
        {/* Logo */}
        <a
          href="#top"
          className="font-serif text-lg whitespace-nowrap text-hiero-navy transition-smooth hover:text-hiero-blue"
        >
          <span className="gradient-text font-bold">Darshit</span>
          <span className="text-text-muted mx-2">·</span>
          <span className="hidden text-[0.85rem] font-sans text-text-secondary sm:inline">
            LFDT Mentorship
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Section navigation"
        >
          {NAV_SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`rounded-lg px-3 py-1.5 text-[0.8rem] font-medium transition-smooth ${
                  isActive
                    ? "bg-blue-50 text-hiero-blue"
                    : "text-text-secondary hover:text-hiero-navy hover:bg-surface-subtle"
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-text-secondary md:hidden hover:bg-surface-subtle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-surface-border bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-[0.88rem] font-medium transition-smooth ${
                  active === s.id
                    ? "bg-blue-50 text-hiero-blue"
                    : "text-text-secondary hover:bg-surface-subtle"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
