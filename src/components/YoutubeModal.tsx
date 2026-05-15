import { Youtube } from "lucide-react";
import { Modal } from "./Modal";
import type { Question } from "@/data/questions";

export function YoutubeModal({
  question,
  open,
  onClose,
}: {
  question: Question;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span>
          <span className="text-hiero-blue">{question.number}</span> ·{" "}
          {question.title}
        </span>
      }
    >
      {question.youtubeUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={question.youtubeUrl}
            title={`${question.number} explanation`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <div
          className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-center"
          style={{
            backgroundColor: "var(--surface-subtle)",
            borderColor: "var(--surface-border)",
          }}
        >
          <Youtube size={42} className="text-hiero-blue" />
          <div className="font-serif text-xl text-hiero-navy">
            Video coming soon
          </div>
          <div className="max-w-[320px] text-sm text-text-secondary">
            This explanation will be recorded before submission.
          </div>
        </div>
      )}
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        A short walk-through of {question.number} — the architectural decision,
        why it was chosen, and the failure modes it prevents.
      </p>
    </Modal>
  );
}
