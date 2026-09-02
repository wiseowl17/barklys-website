import { Link } from "@tanstack/react-router";

export function GalleryPoliciesLinks({ className }: { className?: string }) {
  return (
    <p className={className ?? "mx-auto mt-8 max-w-xl text-sm text-muted"}>
      See recent grooms in our{" "}
      <Link
        to="/gallery"
        className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
      >
        gallery
      </Link>{" "}
      and read our{" "}
      <Link
        to="/policies"
        className="font-medium text-teal-deep underline decoration-sky underline-offset-2"
      >
        policies
      </Link>{" "}
      before you visit.
    </p>
  );
}
