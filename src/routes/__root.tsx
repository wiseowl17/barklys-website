import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";
import { CookieBanner } from "@/components/cookie-banner";
import { MobileCta } from "@/components/mobile-cta";
import { NotFoundPage } from "@/components/not-found";
import { PendingScreen } from "@/components/pending-screen";
import { CmsProvider } from "@/lib/cms-context";
import { getPublicContent } from "@/lib/cms.functions";
import { localBusinessJsonLd, OG_IMAGE_URL } from "@/lib/seo";
import appCss from "../styles.css?url";

const FALLBACK_TITLE =
  "Barkly's | Fear-Free Dog Grooming, Boarding & Daycare in Charlotte";
const FALLBACK_DESCRIPTION =
  "A real home, not a kennel — Fear-Free dog grooming, boarding, and daycare in Charlotte, Fort Mill, Tega Cay, and nearby towns.";

export const Route = createRootRoute({
  loader: () => getPublicContent(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: FALLBACK_TITLE },
      { name: "description", content: FALLBACK_DESCRIPTION },
      { name: "theme-color", content: "#2C5A71" },
      { property: "og:title", content: FALLBACK_TITLE },
      { property: "og:description", content: FALLBACK_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Barkly's" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd()),
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  pendingComponent: PendingScreen,
  component: RootLayout,
});

function RootLayout() {
  const cms = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={
          isAdmin
            ? "flex min-h-svh flex-col bg-cream text-ink"
            : "flex min-h-svh flex-col bg-cream pb-20 text-ink lg:pb-0"
        }
      >
        <PreviewHostBridge />
        <AuthProvider>
          <CmsProvider value={cms}>
            {isAdmin ? null : <Header />}
            <Outlet />
            {isAdmin ? null : <Footer />}
            {isAdmin ? null : <WhatsAppBubble />}
            {isAdmin ? null : <MobileCta />}
            {isAdmin ? null : <CookieBanner />}
          </CmsProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
