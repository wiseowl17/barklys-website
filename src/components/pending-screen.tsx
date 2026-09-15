export function PendingScreen() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center"
      role="status"
      aria-live="polite"
    >
      <span className="size-10 animate-spin rounded-full border-2 border-sky border-t-teal-deep" />
      <p className="text-sm text-muted">Loading…</p>
    </div>
  );
}
