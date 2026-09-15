import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "barklys-cookie-consent";
const GA_ID = "G-GRS5XQS6NT";

function loadAnalytics() {
  if (typeof document === "undefined") return;
  if (document.getElementById("ga-gtag")) return;

  const src = document.createElement("script");
  src.id = "ga-gtag";
  src.async = true;
  src.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(src);

  const inline = document.createElement("script");
  inline.id = "ga-inline";
  inline.textContent = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`;
  document.head.appendChild(inline);
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(KEY);
    if (choice === "accepted") loadAnalytics();
    if (!choice) setVisible(true);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(KEY, value);
    if (value === "accepted") loadAnalytics();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper/95 px-4 py-4 shadow-soft backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
        <p className="flex-1 text-sm text-muted">
          We use optional cookies to see how the site is used (Google Analytics). Read our{" "}
          <Link to="/privacy" className="font-medium text-teal-deep underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => choose("declined")}>
            Decline
          </Button>
          <Button type="button" size="sm" onClick={() => choose("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
