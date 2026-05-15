import { useEffect, useRef, useState } from "react";
import { loadMermaid } from "@/hooks/useMermaid";

export function MermaidDiagram({ id, code }: { id: string; code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setErr(false);
    loadMermaid()
      .then(async (mermaid) => {
        if (cancelled || !containerRef.current) return;
        try {
          const renderId = `mermaid-${id}-${Date.now()}`;
          const { svg } = await mermaid.render(renderId, code);
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e) {
          console.error("mermaid render failed", e);
          if (!cancelled) setErr(true);
        }
      })
      .catch(() => setErr(true));
    return () => { cancelled = true; };
  }, [id, code]);

  if (err) {
    return (
      <div className="py-8 text-center text-sm text-text-muted">
        Diagram could not be rendered.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex min-h-[200px] items-center justify-center [&_svg]:h-auto [&_svg]:max-w-full"
    />
  );
}
