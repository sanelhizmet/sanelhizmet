import ImageSlider from "@/components/ImageSlider";
import { siteConfig, heroSliderImages } from "@/lib/content";

export default function Hero() {
  return (
    <section id="tanitim" className="bg-background pt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {siteConfig.heroDescription}
          </p>
        </div>

        <ImageSlider
          images={heroSliderImages}
          visible={1}
          autoPlayMs={4000}
          altPrefix="Sanel Hizmet"
          imageClassName="mx-auto aspect-[4/5] w-full max-w-md bg-[#f4f4f5] md:aspect-[16/10] md:max-w-4xl"
          roundedClassName="rounded-2xl"
          objectFit="contain"
        />
      </div>
    </section>
  );
}
