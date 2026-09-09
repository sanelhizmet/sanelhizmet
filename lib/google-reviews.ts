import { googleBusiness } from "@/lib/content";

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
  source: "google" | "fallback";
};

/**
 * API'siz: Google'daki yorumları buraya elle ekleyin.
 * total = Google'daki toplam yorum sayısı (şu an 34)
 * reviews = sitede kayan kartlar (ne kadar eklersen hepsi slaytta döner)
 */
export const fallbackReviews: GoogleReviewsData = {
  rating: 5,
  total: 34,
  source: "fallback",
  reviews: [
    {
      id: "fb-1",
      author: "Tolga Acar",
      rating: 5,
      text: "Banyo tadilatımızı baştan sona büyük bir titizlikle tamamladılar. İşçilik kalitesi, kullanılan malzemeler ve detaylara gösterilen özen gerçekten mükemmeldi. Söylenen tarihte teslim ettiler, süreç boyunca iletişimleri çok iyiydi. Sonuç beklentimizin de üzerinde oldu. Güvenilir ve profesyonel bir ekip, gönül rahatlığıyla tavsiye ederim.",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-2",
      author: "Ayberk Aşkın",
      rating: 5,
      text: "İşçiliklere ve insanlıkları gerçekten çok iyi her şeyden çok memnun kaldım çok teşekkür ederim iyi çalışmalar.",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-3",
      author: "Tugce Bubilik",
      rating: 5,
      text: "Usta işini titizlikle yaptı. Sözleştiğimiz saatte geldi. Teşekkürler.",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-4",
      author: "serdar makarac",
      rating: 5,
      text: "Baska tesisatci cagirmistim geldi parcalar aldirtti sonra gelmedi erteledi hep sagolsun bu firmaya google dan bakarken gördüm. Pazar günü olmasina ragmen mağdur oldugumuzu gördü geldi yardimci oldu. hem temiz isciligi var hemde beyefendi. Fiyatlarda önceki tesisatcinin verdiği rakamla ayniydi. Tesekkur etmek icin yorum yapmak istedim.",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-5",
      author: "Ege Birkan Arıkan",
      rating: 5,
      text: "Musluk vanamızın patlaması sonucu hizmet aldım çok memnun kaldım belirtilen saatten önce geldiler sağolsunlar. Hızlı bir şekilde sorunumuz çözüldü. Tek tek açıklama yapıldı Dürüstler tavsiye ederim.",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-6",
      author: "Melek Basaran",
      rating: 5,
      text: "İşçiliği çok güzel çok begendım hem güler yüzlü hemde temiz iş yapıyor tavsiye ederım",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-7",
      author: "Sabri Artan",
      rating: 5,
      text: "Ben duşakabinimi ve tuveleti yaptım memnun kaldım İşini titizlikle yapan bir usta söz verdiği saate gelip işini yapan bir usta efendiliğiyle işe sahip çıkın bir usta tavsiye ederim",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-8",
      author: "Tuncay Dursun",
      rating: 5,
      text: "Ellerinize kollarınıza sağlık çok temiz ve hijyenik bir iş çıktı teşk. 🙏🙏",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-9",
      author: "TOLGA ŞAHİN",
      rating: 5,
      text: "Temiz ve hızlı hizmet teşekkürler..",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-10",
      author: "Ayşen Kaya",
      rating: 5,
      text: "Beyefendi dediği saatte geldi ve klozet borusundaki sorunu tespit edip onardı. Temiz çalıştı tavsiye ederim",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-11",
      author: "Ali Yüzer",
      rating: 5,
      text: "30 yıllık arabamın tüm döşemeleri pırıl pırıl yaptı. Elinize sağlık",
      relativeTime: "Google yorumu",
    },
    {
      id: "fb-12",
      author: "Busra Karaca",
      rating: 5,
      text: "Ekibe çok teşekkür ederim. Koltuk takımlarım çok temiz oldu. Baya uğraşıldı gerçekten memnun kaldık. Benim gibi detaycı birini memnun ettiler. Tavsiye ederim.",
      relativeTime: "Google yorumu",
    },
  ],
};

type PlaceReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  time?: number;
};

type PlaceDetailsResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlaceReview[];
  };
};

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return fallbackReviews;
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json",
    );
    url.searchParams.set("place_id", googleBusiness.placeId);
    url.searchParams.set(
      "fields",
      "name,rating,user_ratings_total,reviews,url",
    );
    url.searchParams.set("language", "tr");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return fallbackReviews;
    }

    const data = (await res.json()) as PlaceDetailsResponse;

    if (data.status !== "OK" || !data.result) {
      return fallbackReviews;
    }

    const reviews = (data.result.reviews ?? [])
      .filter((r) => r.text && r.author_name)
      .map((r, i) => ({
        id: `g-${r.time ?? i}`,
        author: r.author_name!,
        rating: r.rating ?? 5,
        text: r.text!,
        relativeTime: r.relative_time_description ?? "",
        profilePhotoUrl: r.profile_photo_url,
      }));

    if (reviews.length === 0) {
      return {
        ...fallbackReviews,
        rating: data.result.rating ?? fallbackReviews.rating,
        total: data.result.user_ratings_total ?? fallbackReviews.total,
        source: "fallback",
      };
    }

    return {
      rating: data.result.rating ?? 5,
      total: data.result.user_ratings_total ?? reviews.length,
      reviews,
      source: "google",
    };
  } catch {
    return fallbackReviews;
  }
}
