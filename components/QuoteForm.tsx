"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/content";

type QuoteFormProps = {
  serviceTitle: string;
};

export default function QuoteForm({ serviceTitle }: QuoteFormProps) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [problem, setProblem] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const serviceForMessage = serviceTitle
      .replace(/Yenileme$/, "Yenilemeyi")
      .replace(/Tesisat$/, "Tesisatı")
      .replace(/Montajı$/, "Montajını")
      .replace(/Tamiri$/, "Tamirini")
      .replace(/Tezgâh$/, "Tezgâhı");

    const message = [
      `Merhaba, ${serviceForMessage} için teklif almak istiyorum.`,
      "",
      `Ad Soyad: ${name.trim()}`,
      `İlçe: ${district.trim()}`,
      `Sorun: ${problem.trim()}`,
    ].join("\n");

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-2xl border border-surface-light bg-surface p-6 md:p-8">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Teklif Al</h2>
      <p className="mb-6 text-sm text-muted">
        Formu doldurun; WhatsApp üzerinden hazır teklif mesajınız açılsın.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="quote-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Ad Soyad
          </label>
          <input
            id="quote-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız ve soyadınız"
            className="w-full rounded-xl border border-surface-light bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div>
          <label
            htmlFor="quote-district"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            İlçe
          </label>
          <input
            id="quote-district"
            type="text"
            required
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Örn. Kadıköy"
            className="w-full rounded-xl border border-surface-light bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div>
          <label
            htmlFor="quote-problem"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Sorun / İş açıklaması
          </label>
          <textarea
            id="quote-problem"
            required
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Kısaca ne yaptırmak istediğinizi yazın"
            className="w-full resize-y rounded-xl border border-surface-light bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" />
          Teklif Al
        </button>
      </form>
    </div>
  );
}
