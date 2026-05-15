import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Modal } from "./Modal";
import { loadMermaid } from "@/hooks/useMermaid";
import type { Question } from "@/data/questions";

export function MermaidModal({
  question,
  open,
  onClose,
}: {
  question: Question;
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErr(false);
    let cancelled = false;
    loadMermaid()
      .then(async (mermaid) => {
        if (cancelled || !containerRef.current) return;
        try {
          const id = `m-${question.id}-${Date.now()}`;
          const { svg } = await mermaid.render(id, question.mermaid);
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e) {
          console.error("mermaid render failed", e);
          if (!cancelled) setErr(true);
        }
      })
      .catch(() => setErr(true));
    return () => {
      cancelled = true;
    };
  }, [open, question]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.mermaid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span>
          <span className="text-hiero-blue">{question.number}</span> ·
          Architecture Diagram
        </span>
      }
    >
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8rem] font-medium text-hiero-blue transition-smooth hover:bg-surface-subtle"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy Mermaid source"}
        </button>
      </div>

      <div
        className="overflow-auto rounded-xl border border-surface-border p-5"
        style={{ backgroundColor: "var(--surface-page)" }}
      >
        {err ? (
          <div className="py-12 text-center">
            <div className="font-serif text-lg text-hiero-navy">
              Diagram unavailable
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              The Mermaid source is available via the "Copy source" button
              above.
            </p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-render flex min-h-[260px] items-center justify-center [&_svg]:h-auto [&_svg]:max-w-full"
          />
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {question.diagramCaption}
      </p>
    </Modal>
  );
}
