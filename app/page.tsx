import QuoteForm from "@/app/components/quote-form";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 md:px-10 md:py-16">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-900 p-8 text-white md:p-12">
        <p className="mb-4 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          WebSell studio
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          We design and ship business websites that sell for you.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg">
          From one-page launches to full conversion-focused websites, WebSell
          helps your business look premium and close more clients.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/10 px-4 py-2">
            Delivery in 7-14 days
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2">
            SEO-ready pages
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2">
            Conversion-first copy blocks
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Starter Site",
            price: "$499",
            details: "Single-page website for new businesses.",
          },
          {
            title: "Growth Site",
            price: "$999",
            details: "Multi-page site with services, testimonials, and blog.",
          },
          {
            title: "Scale Site",
            price: "$1,999",
            details: "High-converting funnel flow and lead capture automation.",
          },
        ].map((plan) => (
          <article
            key={plan.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{plan.title}</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-700">{plan.price}</p>
            <p className="mt-3 text-sm text-slate-600">{plan.details}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 rounded-3xl bg-slate-50 p-6 md:grid-cols-2 md:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Request a quote</h2>
          <p className="mt-3 max-w-lg text-slate-600">
            Tell us about your business and website goals. We will email you a
            tailored proposal with timeline and pricing.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li>• Strategy call included</li>
            <li>• Design + development bundled</li>
            <li>• Launch support included</li>
          </ul>
        </div>
        <QuoteForm />
      </section>
    </main>
  );
}
