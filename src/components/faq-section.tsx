import type { FaqItem } from "@/lib/seo";

export function FaqSection({ title, faqs }: { title: string; faqs: readonly FaqItem[] }) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl">{title}</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-xl border border-line bg-paper p-6 shadow-card"
            >
              <h3 className="font-display text-xl">{faq.question}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
