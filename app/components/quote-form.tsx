"use client";

import { FormEvent, useState } from "react";

type QuotePayload = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

const emptyState: QuotePayload = {
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
};

export default function QuoteForm() {
  const quoteEndpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? "/api/quote";
  const [form, setForm] = useState<QuotePayload>(emptyState);
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    setSending(true);

    try {
      const response = await fetch(quoteEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send quote request.");
      }

      setStatus("Quote request sent. We will contact you shortly.");
      setForm(emptyState);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to send quote request right now."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
      onSubmit={onSubmit}
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="budget">
          Budget
        </label>
        <select
          id="budget"
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
          value={form.budget}
          onChange={(event) => setForm({ ...form, budget: event.target.value })}
        >
          <option value="" disabled>
            Select budget range
          </option>
          <option value="$500-$1,000">$500-$1,000</option>
          <option value="$1,000-$2,500">$1,000-$2,500</option>
          <option value="$2,500+">$2,500+</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">
          Project goals
        </label>
        <textarea
          id="message"
          required
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {sending ? "Sending..." : "Get my quote"}
      </button>

      {status ? <p className="text-sm text-slate-700">{status}</p> : null}
    </form>
  );
}
