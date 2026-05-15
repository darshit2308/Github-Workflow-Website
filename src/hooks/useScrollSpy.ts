import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);

  return active;
}
