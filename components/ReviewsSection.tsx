import GoogleReviews from "@/components/GoogleReviews";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function ReviewsSection() {
  const reviews = await getGoogleReviews();

  return (
    <section id="yorumlar" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <GoogleReviews data={reviews} />
      </div>
    </section>
  );
}
