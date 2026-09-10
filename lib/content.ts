import {
  dusakabinOncesiSonrasi,
  dusakabinUstSlayt,
  fayansOncesiSonrasi,
  fayansUstSlayt,
  heroSliderImages,
  klozetOncesiSonrasi,
  klozetUstSlayt,
  muslukOncesiSonrasi,
  muslukUstSlayt,
  mutfakOncesiSonrasi,
  mutfakUstSlayt,
  tesisatOncesiSonrasi,
  tesisatUstSlayt,
} from "@/lib/musteri-images";

export const siteConfig = {
  name: "Sanel Hizmet",
  phone: "0551 889 74 62",
  whatsapp: "905518897462",
  tagline: "Uygun Fiyat, Kaliteli Hizmet",
  heroTitle: "Uygun Fiyat, Kaliteli Hizmet",
  heroDescription:
    "Güvenilir ve profesyonel kadromuzla, uygun fiyatlı hizmeti, siz değerli müşterilerimize sunuyoruz.",
  serviceArea: "İstanbul ve çevresi",
  address:
    "Fevzi Çakmak Mahallesi, Altın Sk. No:6, 34290 Küçükçekmece/İstanbul",
  addressShort: "Fevzi Çakmak Mh., Altın Sk. No:6, Küçükçekmece",
};

export const googleBusiness = {
  placeId: "ChIJ8-UowKyjyhQRnzdBOMmgyGw",
  reviewUrl: "https://g.page/r/CZ83QTjJoMhsEAE/review",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Fevzi+%C3%87akmak+Mahallesi%2C+Alt%C4%B1n+Sk.+No%3A6%2C+34290+K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece%2F%C4%B0stanbul",
  reviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJ8-UowKyjyhQRnzdBOMmgyGw",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Fevzi+%C3%87akmak+Mahallesi%2C+Alt%C4%B1n+Sk.+No%3A6%2C+34290+K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece%2F%C4%B0stanbul&hl=tr&z=17&output=embed",
};

export const navLinks = [
  { label: "Ana Sayfa", href: "/#tanitim" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Yorumlar", href: "/#yorumlar" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "İletişim", href: "/#iletisim" },
];

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceStep = {
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  /** Ana sayfa kategori kartı görseli */
  image: string;
  features: string[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  /** Yazı altı slayt → public/musteri/<hizmet>/ust-slayt/ */
  topImages: string[];
  /** Alt slayt → public/musteri/<hizmet>/oncesi-sonrasi/ */
  beforeAfterImages: string[];
};

export const services: Service[] = [
  {
    slug: "dusakabin",
    title: "Duşakabin Tamir ve Yenileme",
    shortDescription: "Duşakabin montajı, tamiratı ve yenileme",
    description: "",
    image: "/musteri/dusakabin/kategori.webp",
    features: [
      "Müşteri isteğine göre ölçü, renk ve tasarımına göre duşakabini seçiyoruz",
      "Yapay zeka araçları kullanarak görseller oluşturuyoruz",
      "Eski duşakabini söküyoruz",
      "Tesisat, alt yapı ve süzgeci tamamlıyoruz",
      "Zemin fayansını yeniliyoruz ve duşakabin için kenar mermer çıtasını kuruyoruz",
      "Duşakabin montajı için zemini kurumaya bırakıyoruz (minimum 24 saat)",
      "Duşakabini montajlıyoruz",
      "Duşakabin silikonları kuruduktan sonra kullanıma hazırdır",
    ],
    steps: [
      {
        title: "Keşif",
        text: "Yapılmak istenen yer için yerinde keşif ile müşterinin ihtiyacı, mekanın ölçüleri ve dekorasyon renk / materyal konusunda karar veriyoruz.",
      },
      {
        title: "Teklif",
        text: "Yapılan değerlendirmeler sonucunda uygun fiyatlı teklifimizi sunuyoruz.",
      },
      {
        title: "Uygulama",
        text: "Tüm süreci titizlikle yaparak söz verilen sürede kullanıma hazır halde teslim ediyoruz.",
      },
      {
        title: "Ödeme",
        text: "Teklif kabul edildikten sonraki ilk uygulamada ödemenin yarısını; iş bitip müşteri memnuniyeti sonrası diğer yarısını elden veya havale ile alıyoruz.",
      },
    ],
    faqs: [
      {
        question: "Eski duşakabinimi yenilemek istiyorum, ne yapıyorsunuz?",
        answer:
          "Eski kabini söküyoruz; tesisat, süzgeç ve zemin hazırlığını tamamlayıp ölçü / renk / tasarıma göre yeni kabini montajlıyoruz.",
      },
      {
        question: "Duşakabin yerini değiştirmek veya yeni kabin taktırmak istiyorum",
        answer:
          "Yerinde keşifte ölçü alıyoruz, isterseniz yapay zeka ile ön görsel hazırlıyoruz; zemin en az 24 saat kuruduktan sonra montaj yapılır.",
      },
      {
        question: "Kabinin silikonu aktıyor / camı sallanıyor, tamir olur mu?",
        answer:
          "Evet; sızdırma, menteşe, kapı ve silikon sorunlarında yerinde bakıp onarıyoruz veya gerekirse yeniliyoruz.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, kullanılacak malzemeye ve işçiliğe göre keşif sonrası netleşir; sabit paket fiyatı yoktur.",
      },
    ],
    topImages: [...dusakabinUstSlayt],
    beforeAfterImages: [...dusakabinOncesiSonrasi],
  },
  {
    slug: "sihhi-tesisat",
    title: "Sıhhi Tesisat",
    shortDescription: "Su tesisatı montaj ve tamiri",
    description: "",
    image: "/musteri/tesisat/kategori.webp",
    features: [
      "Yeni mutfak tesisat hattı çekme ve yenileme",
      "Yeni banyo tesisat hattı çekme ve yenileme",
      "Gömme klozet tesisatı",
      "Su saati tamir ve montajı",
      "Su saati filtre montajı",
      "Çamaşır ve bulaşık makinesi tesisat hattı",
    ],
    steps: [
      {
        title: "Servis kaydı oluşturma",
        text: "Müşterinin şikayetine göre müşteri ile servis planlaması yapıyoruz ve arıza tespit ediyoruz.",
      },
      {
        title: "Teklif",
        text: "İş durumuna ve kullanılacak malzemeye göre fiyat teklif ediyoruz.",
      },
      {
        title: "Uygulama",
        text: "Arıza tespit sonrası, teklif kabul edildiğinde sorunun çözümü için hızlı ve titizlikle işi sonlandırıyoruz.",
      },
      {
        title: "Ödeme",
        text: "Elden nakit veya banka havalesi ile ödemeyi alıyoruz.",
      },
    ],
    faqs: [
      {
        question: "Mutfak tesisatını duvar içine almak istiyorum",
        answer:
          "Evet; mutfak tesisat hattını çekme, yenileme ve duvar içine gizleme işlerini yapıyoruz.",
      },
      {
        question: "Tesisat hattını gizleyebilir misiniz?",
        answer:
          "Evet; görünür boruları ve hatları uygun şekilde gizleyip temiz bir görünüm bırakıyoruz.",
      },
      {
        question: "Banyomda su kaçağı var / acil geliyor musunuz?",
        answer:
          "İstanbul içinde mümkün olan en kısa sürede müdahale ederiz. WhatsApp veya telefonla durumu yazmanız yeterli.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, işin durumuna, kullanılacak malzemeye ve işçiliğe göre yerinde tespit sonrası verilir.",
      },
    ],
    topImages: [...tesisatUstSlayt],
    beforeAfterImages: [...tesisatOncesiSonrasi],
  },
  {
    slug: "rezervuar-klozet",
    title: "Klozet ve Rezervuar Tamir ve Montajı",
    shortDescription: "Klozet, rezervuar ve sifon montajı / tamiri",
    description: "",
    image: "/musteri/klozet/kategori.webp",
    features: [
      "Klozet montajı yapılır",
      "Klozetlerin su kaçırma ve su almama arızaları giderilir",
      "Gömme rezervuar arızası tamir edilir",
      "Rezervuar iç takım değişimi yapılır",
      "Sifon arızası tamir edilir",
      "Klozet musluğu değiştirilir",
      "Klozet flex boru değiştirilir",
      "Alaturka ve alafranga tuvalet değişimleri yapılır",
      "Gömme rezervuar ve asma klozet değişimleri yapılır",
      "Taharet musluğu temini ve değişimi",
      "Engelli banyo taburesi ve tutamak montajı",
    ],
    steps: [
      {
        title: "Servis kaydı oluşturma",
        text: "Müşteri şikayetine göre arızayı belirliyoruz ve servis kaydı oluşturuyoruz.",
      },
      {
        title: "Teklif",
        text: "Müşteriye malzeme ya da işçilik teklifleri sunuyoruz.",
      },
      {
        title: "Uygulama",
        text: "Oluşturulan servis kaydına göre arızaya ve müşteri memnuniyetine yönelik çalışmayı yapıp sonlandırıyoruz.",
      },
      {
        title: "Ödeme",
        text: "Elden ya da banka havalesi ile ödeme kabul ediyoruz.",
      },
    ],
    faqs: [
      {
        question: "Klozetim su kaçırıyor / rezervuar sürekli akıtıyor",
        answer:
          "Çoğu zaman iç takım veya conta kaynaklıdır; yerinde bakıp tamir veya iç takım değişimiyle çözüyoruz.",
      },
      {
        question: "Gömme rezervuar / asma klozet taktırmak istiyorum",
        answer:
          "Evet; gömme rezervuar ve asma klozet montajı ile değişimini yapıyoruz.",
      },
      {
        question: "Alaturka tuvaleti alafrangaya çevirmek istiyorum",
        answer:
          "Evet; alaturka–alafranga değişimleri, sifon, musluk ve flex boru işleri de kapsamımızda.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, kullanılacak malzemeye ve işçiliğe göre teklif edilir; malzemeli veya sadece işçilik seçenekleri sunulabilir.",
      },
    ],
    topImages: [...klozetUstSlayt],
    beforeAfterImages: [...klozetOncesiSonrasi],
  },
  {
    slug: "musluk-batarya",
    title: "Musluk ve Batarya Montajı ve Tamiri",
    shortDescription: "Musluk ve batarya montajı, değişimi ve tamiri",
    description: "",
    image: "/musteri/musluk/kategori.webp",
    features: [
      "Banyo lavabo bataryası değişimi, montajı ve tamiri",
      "Banyo ve mutfak flex hortum değişimi",
      "Mutfak bataryası değişimi, montajı ve tamiri",
      "Duş bataryası değişimi, montajı ve tamiri",
      "Duş seti değişimi, montajı ve tamiri",
      "Piano black duş seti ve batarya montajı",
      "Bahçe musluğu değişimi ve montajı",
      "Mutfak ve banyo vana değişimi ve tamiri",
      "Banyo aksesuar montajı",
    ],
    steps: [
      {
        title: "Servis kaydı oluşturma",
        text: "Müşteri isteğine göre arızayı belirliyoruz ve servis kaydı oluşturuyoruz.",
      },
      {
        title: "Teklif",
        text: "Kullanılan malzemeye göre işçilik dahil; malzemeli veya malzemesiz, müşteri bütçesine göre teklif hazırlarız.",
      },
      {
        title: "Servis",
        text: "Oluşturulan servis kaydına göre arızaya ve müşteri memnuniyetine yönelik çalışmaları gerçekleştiriyoruz.",
      },
      {
        title: "Ödeme",
        text: "Elden veya banka havalesi ile ödemeyi alıyoruz.",
      },
    ],
    faqs: [
      {
        question: "Musluğum damlatıyor, değişmek şart mı?",
        answer:
          "Bazen conta veya kartuş yenilemesi yeterli olur. Duruma bakıp en uygun çözümü söyleriz.",
      },
      {
        question: "Mutfak / lavabo bataryamı yenilemek istiyorum",
        answer:
          "Evet; banyo lavabo, mutfak ve duş bataryası ile flex hortum montajı, değişimi ve tamiri yapıyoruz.",
      },
      {
        question: "Piano black duş seti veya duş seti taktırmak istiyorum",
        answer:
          "Evet; duş seti ve piano black duş seti / batarya montajını yapıyoruz.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, kullanılacak malzemeye ve işçiliğe göre netleşir; malzemeli veya sadece işçilik teklifi hazırlanabilir.",
      },
    ],
    topImages: [...muslukUstSlayt],
    beforeAfterImages: [...muslukOncesiSonrasi],
  },
  {
    slug: "fayans",
    title: "Fayans ve Seramik Tamiri ve Yenileme",
    shortDescription: "Fayans / seramik tadilatı, yenileme ve döşeme",
    description: "",
    image: "/musteri/fayans/kategori.webp",
    features: [
      "Banyo tadilatı fayansı",
      "Mutfak zemin fayansı",
      "Mutfak tezgâh arası fayans",
      "Hol fayansı yenileme",
      "Duşakabin içi zemin fayansı",
      "Duşakabin fayans tamiri",
      "Teras fayansı yenileme",
      "Teras sıvı yalıtım",
      "Kırık fayans onarımı",
      "Derz yenileme",
      "Niş yapımı",
    ],
    steps: [
      {
        title: "Keşif",
        text: "Müşteri isteği ve işin durumuna göre yapılacak işler ile kullanılacak malzeme belirlenir; yapılacak işe göre projelendirme yapılır.",
      },
      {
        title: "Teklif",
        text: "Hazırlanan keşif sonrası müşterinin bütçesine uygun fiyatlandırma seçenekleri sunulur.",
      },
      {
        title: "Uygulama",
        text: "Belirlenen tarihlerde çalışmaya başlanır ve sonlandırıldıktan sonra teslim yapılır.",
      },
      {
        title: "Ödeme",
        text: "Elden veya banka havalesi ile yarısı işin başlangıcında, yarısı iş bitiminde alınır.",
      },
    ],
    faqs: [
      {
        question: "Banyomu yenilemek istiyorum",
        answer:
          "Evet; banyo fayansı tadilatı, duşakabin içi zemin, derz yenileme ve niş yapımı dahil komple yenileme yapıyoruz.",
      },
      {
        question: "Mutfak tezgâh arası / zemin fayansımı değiştirmek istiyorum",
        answer:
          "Evet; mutfak zemin ve tezgâh arası fayans döşeme ile yenileme işlerini yapıyoruz.",
      },
      {
        question: "Birkaç fayans kırıldı, sadece onları mı değiştirebilirsiniz?",
        answer:
          "Evet; kırık fayans onarımı ve derz yenileme de yapılır. Teras fayansı ve sıvı yalıtım da kapsamımızda.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, kullanılacak malzemeye, metraj / işin kapsamına ve işçiliğe göre keşif sonrası netleşir.",
      },
    ],
    topImages: [...fayansUstSlayt],
    beforeAfterImages: [...fayansOncesiSonrasi],
  },
  {
    slug: "mutfak",
    title: "Dolap Kurulum ve Tamiri",
    shortDescription: "Tüm dolap işleri — kurulum ve tamir",
    description: "",
    image: "/musteri/mutfak/kategori.webp",
    features: [
      "Banyo, mutfak, çalışma masası, kiler, ayakkabılık, vestiyer ve kahve köşesi dolabı montajı",
      "Dolap kapak yenileme ve tamiri",
      "Dolap kulp ve menteşe değişimi",
      "Dolapların kırıklarının onarımı",
      "Banyo ve mutfak dolabı sökümü",
      "Dolap ışıklandırma",
      "IKEA, Koçtaş, Bauhaus vb. demonte dolap kurulumu",
    ],
    steps: [
      {
        title: "Servis kaydı oluşturma",
        text: "Müşterilerin isteğine göre, belirlenen talep doğrultusunda servis kaydı oluşturulur.",
      },
      {
        title: "Teklif",
        text: "Servis kaydına göre fiyat teklifi verilir.",
      },
      {
        title: "Uygulama",
        text: "Belirlenen tarih ve saatte servis verilir ve sonlandırılır.",
      },
      {
        title: "Ödeme",
        text: "Servis bitiminde elden veya banka havalesi ile ödeme alınır.",
      },
    ],
    faqs: [
      {
        question: "IKEA / Koçtaş dolabımı kurdurmak istiyorum",
        answer:
          "Evet; IKEA, Koçtaş, Bauhaus ve benzeri demonte dolap kurulumu yapıyoruz.",
      },
      {
        question: "Mutfak / banyo dolabımı yenilemek veya söküp takmak istiyorum",
        answer:
          "Evet; mutfak, banyo, kiler, ayakkabılık, vestiyer ve kahve köşesi dolabı montajı ile sökümünü yapıyoruz.",
      },
      {
        question: "Dolap kapağı / menteşesi bozuk, sadece tamir olur mu?",
        answer:
          "Evet; kapak yenileme, kulp / menteşe değişimi, kırık onarımı ve dolap ışıklandırma da yapılır.",
      },
      {
        question: "Fiyat ne kadar tutar?",
        answer:
          "Fiyat, kullanılacak malzemeye ve işçiliğe göre servis kaydına göre teklif edilir.",
      },
    ],
    topImages: [...mutfakUstSlayt],
    beforeAfterImages: [...mutfakOncesiSonrasi],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export { heroSliderImages };

/** Eski galeri yedek (ana slayt heroSliderImages kullanır) */
export const completedWorkImages = heroSliderImages;

export const aboutContent = {
  whoWeAre: {
    title: "Biz Kimiz",
    text: "Sanel Hizmet olarak kurulduğumuz günden bu yana hizmet sektöründe kalite, güven ve sürdürülebilirlik ilkelerini benimseyerek yolumuza devam ediyoruz. Sektördeki yenilikleri yakından takip eden, dinamik ve alanında uzman kadromuzla müşterilerimizin ihtiyaçlarına değer katan profesyonel çözümler üretiyoruz. Müşteri memnuniyetini her zaman en üst sırada tutarak standartları yükseltmeye ve sektörde fark yaratmaya kararlılıkla devam ediyoruz. Amacımız, ihtiyaçlarınızı en doğru şekilde analiz ederek size en etkili, hızlı ve güvenilir hizmeti uygun fiyatla sunmaktır.",
  },
  aboutUs: {
    title: "Hakkımızda",
    text: "Sanel Hizmet, yaşam alanlarınızın konforunu, güvenliğini ve işlevselliğini korumak amacıyla kurulan profesyonel bir hizmet sağlayıcısıdır. Hizmet sektöründe başarının anahtarının güven ve zamanında teslimat olduğunun bilincindeyiz. Bu doğrultuda, deneyimli ve alanında uzman teknik kadromuzla her projeye aynı titizlik ve profesyonellikle yaklaşıyoruz. Küçük bir musluk tamirinden kapsamlı banyo yenileme ve sıhhi tesisat projelerine kadar, her adımda yüksek kalite standartlarından ödün vermeden çalışıyoruz.",
  },
  contact: {
    title: "İletişim",
    text: "Keşif ve fiyat teklifi için WhatsApp veya telefon ile yazmanız yeterli. Hizmet bölgemiz İstanbul ve çevresidir; mümkün olan en kısa sürede dönüş yapıyoruz.",
  },
};
