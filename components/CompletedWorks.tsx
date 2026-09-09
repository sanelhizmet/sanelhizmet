import ImageSlider from "@/components/ImageSlider";
import { completedWorkImages } from "@/lib/content";

export default function CompletedWorks() {
  return (
    <section id="isler" className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ImageSlider
          images={completedWorkImages}
          visible={1}
          autoPlayMs={4500}
          altPrefix="Tamamlanan iş"
          imageClassName="mx-auto aspect-[3/4] w-full max-w-md bg-[#f4f4f5] md:aspect-[4/5] md:max-w-2xl"
          roundedClassName="rounded-2xl"
          objectFit="contain"
        />
      </div>
    </section>
  );
}
