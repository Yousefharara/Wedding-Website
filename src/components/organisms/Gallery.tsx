import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { cn } from "@/lib/utils";

/**
 * معرض الصور: منزلق CSS أصلي (scroll-snap) مع أزرار ::scroll-button
 * ونقاط تثبيت (anchors) تتنقل بين الصور.
 */
export default function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const images = SITE_CONFIG.photos.gallery;
  const count = images.length;

  // تحديث النقطة الفعالة حسب الصورة المركزية
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const containerRect = el.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;
      let best = 0;
      let bestDist = Infinity;

      el.querySelectorAll<HTMLElement>("[data-slide]").forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const target = el.querySelectorAll<HTMLElement>("[data-slide]")[index];
    if (!target) return;

    const containerRect = el.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.left +
      targetRect.width / 2 -
      (containerRect.left + containerRect.width / 2);

    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="لحظات لا تُنسى"
        title="معرض الصور"
        subtitle="لمحات من أجمل ذكريات قصة حبّنا"
      />

      {/* حاوية التمرير الأصلية */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label="معرض الصور"
        tabIndex={0}
        className="gallery-scroller mt-12"
      >
        {images.map((src, index) => (
          <motion.figure
            key={src}
            data-slide
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
            className="group relative h-[22rem] cursor-pointer overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 shadow-lg transition-transform duration-500 hover:scale-[1.03] sm:h-[24rem]"
          >
            <img
              src={src}
              alt={`صورة ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#59233a]/55 via-transparent to-transparent opacity-80" />
            <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-4 py-1 text-xs font-bold text-wine backdrop-blur-sm">
              💗 ذكرى {index + 1} / {count}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* نقاط التثبيت للتنقل بين الصور */}
      <div className="mt-8 flex items-center justify-center gap-2" dir="rtl">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`الانتقال إلى صورة ${i + 1}`}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === active
                ? "w-8 bg-gradient-to-l from-gold-dark to-gold"
                : "w-2.5 bg-primary/30 hover:bg-primary/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}