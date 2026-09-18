import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slides, setSlides] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSlides(emblaApi.scrollSnapList().length);
    };
    const rafId = requestAnimationFrame(update);
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    return () => {
      cancelAnimationFrame(rafId);
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="لحظات لا تُنسى"
        title="معرض الصور"
        subtitle="لمحات من أجمل ذكريات قصة حبّنا"
      />

      <div className="mt-12">
        <div className="overflow-hidden" ref={emblaRef} dir="rtl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="-ml-4 flex touch-pan-y"
          >
            {SITE_CONFIG.photos.gallery.map((src, index) => (
              <div className="min-w-0 flex-[0_0_78%] pl-4 sm:flex-[0_0_46%] lg:flex-[0_0_34%]" key={src}>
                <div className="group relative h-[22rem] cursor-pointer overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 shadow-lg transition-transform duration-500 hover:scale-[1.03]">
                  <img
                    src={src}
                    alt={`صورة ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#59233a]/55 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-4 py-1 text-xs font-bold text-wine backdrop-blur-sm">
                    💗 ذكرى {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* أزرار التنقل */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-full"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="السابق"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2" dir="rtl">
            {Array.from({ length: slides }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`صورة ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === selectedIndex
                    ? "w-8 bg-gradient-to-l from-gold-dark to-gold"
                    : "w-2.5 bg-primary/30 hover:bg-primary/50",
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-full"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="التالي"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}