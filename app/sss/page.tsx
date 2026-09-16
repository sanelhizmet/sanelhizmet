import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | İstanbul",
  description:
    "Sanel Hizmet'in İstanbul'daki duşakabin, tesisat, klozet, musluk, fayans ve dolap hizmetleri hakkında sıkça sorulan sorular.",
  alternates: { canonical: "/sss" },
};

const faqs = [
  {
    question: "Randevu verdiğiniz saatte geliyor musunuz?",
    answer:
      "Planlamayı verilen randevu saatine göre yapıyoruz. Trafik veya önceki işin uzaması gibi bir gecikme ihtimali doğarsa, mümkün olan en kısa sürede bilgi veriyoruz.",
  },
  {
    question: "Acil tesisat arızalarında yardımcı oluyor musunuz?",
    answer:
      "Patlayan vana, su kaçağı, musluk veya sifon arızası gibi acil durumlarda uygunluk durumuna göre hızlı destek sağlıyoruz. Telefon ya da WhatsApp üzerinden arızayı ve konumunuzu paylaşmanız yeterli.",
  },
  {
    question: "Hafta sonu hizmet veriyor musunuz?",
    answer:
      "Hafta sonu için de randevu oluşturabiliyoruz. Müsaitlik, işin kapsamına ve bulunduğunuz konuma göre netleşir; en doğru bilgi için bize ulaşabilirsiniz.",
  },
  {
    question: "Fiyat nasıl belirleniyor?",
    answer:
      "Fiyat; yapılacak işin türü, malzeme ihtiyacı, arızanın durumu ve işçilik süresine göre belirlenir. Önce ihtiyacı netleştirip mümkün olduğunca şeffaf bir fiyat bilgisi paylaşırız.",
  },
  {
    question: "İşe başlamadan önce yapılacakları anlatıyor musunuz?",
    answer:
      "Evet. Sorunun kaynağını, uygulanacak işlemi ve gerekiyorsa değişecek parçaları anlaşılır biçimde açıklarız. Böylece işlem başlamadan önce ne yapılacağını bilirsiniz.",
  },
  {
    question: "Temiz çalışıyor musunuz?",
    answer:
      "Çalışma alanını korumaya ve iş sonunda oluşan kalıntıları toplamaya özen gösteriyoruz. Özellikle banyo, mutfak ve fayans işlerinde alanın düzenli bırakılması bizim için önemlidir.",
  },
  {
    question: "Musluk, batarya veya vana patladıysa ne yapmalıyım?",
    answer:
      "Önce ana su vanasını kapatın ve mümkünse suyun yayıldığı alanı güvene alın. Ardından bizi arayın veya WhatsApp'tan fotoğraf/video gönderin; arızayı daha hızlı değerlendirip yönlendirelim.",
  },
  {
    question: "Klozet, rezervuar ve sifon arızaları yerinde tespit edilir mi?",
    answer:
      "Evet. Su kaçırma, dolmayan rezervuar, sürekli akan sifon, taharet musluğu veya klozet borusu gibi sorunlar yerinde incelenir; uygun çözüm ve gerekli parça bilgisi paylaşılır.",
  },
  {
    question: "Duşakabin veya banyo yenileme ne kadar sürer?",
    answer:
      "Süre; yapılacak işlemlere, ölçüye özel üretim gerekip gerekmediğine ve malzeme durumuna bağlıdır. Keşif veya görsel inceleme sonrasında daha net bir çalışma takvimi veriyoruz.",
  },
  {
    question: "Dolap kurulumu ve mobilya tamiri yapıyor musunuz?",
    answer:
      "Demonte dolap kurulumu, mutfak-banyo dolabı, vestiyer ve benzeri mobilyaların montaj ya da küçük tamir işlemlerinde yardımcı oluyoruz. Ürünün fotoğrafını ve varsa model bilgisini iletmeniz yeterli.",
  },
  {
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      `Başta İstanbul olmak üzere ${siteConfig.serviceArea} hizmet veriyoruz. Konumunuzu paylaşarak servis uygunluğunu hızlıca öğrenebilirsiniz.`,
  },
  {
    question: "Teklif veya randevu için nasıl ulaşabilirim?",
    answer:
      "Bizi telefonla arayabilir ya da WhatsApp üzerinden mesaj gönderebilirsiniz. Yapılacak işin fotoğrafını, kısa açıklamasını ve konumunuzu iletmeniz teklif sürecini hızlandırır.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <>
      <Navbar />
      <main className="bg-surface pt-24 sm:pt-28">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Sanel Hizmet
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sıkça Sorulan Sorular
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Müşterilerimizin yorumlarında en çok öne çıkan konulara göre
              hazırladığımız kısa cevaplar burada.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-surface-light bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left font-semibold text-foreground marker:content-none sm:px-6">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6 sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-primary px-6 py-8 text-center text-white sm:px-10">
            <h2 className="text-2xl font-bold">Sorunuzun cevabı burada değil mi?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/80">
              İşinizi kısaca anlatın, fotoğraf veya video gönderin. Size en uygun
              yönlendirme ve randevu bilgisini paylaşalım.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp&apos;tan yazın
              </a>
            </div>
            <Link
              href="/#hizmetler"
              className="mt-5 inline-block text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              Tüm hizmetleri inceleyin
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
