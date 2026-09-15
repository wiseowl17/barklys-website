import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">This trail went cold</h1>
      <p className="mt-4 text-muted">
        That page isn’t here — maybe it got a trim. Let’s get you back to grooming,
        boarding, or booking.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/book">Book an appointment</Link>
        </Button>
      </div>
    </main>
  );
}
