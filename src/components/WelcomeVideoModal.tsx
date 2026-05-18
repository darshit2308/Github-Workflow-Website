import { Modal } from "./Modal";

export function WelcomeVideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span>
          <span className="text-hiero-blue">Core Architecture</span> Explained
        </span>
      }
    >
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src="https://www.youtube.com/embed/0LkjQ7UJkV0"
          title="Core Architecture Explained"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-secondary text-center">
        Watch a short walk-through of the core architecture of the Hiero Workflow App.
      </p>
    </Modal>
  );
}
