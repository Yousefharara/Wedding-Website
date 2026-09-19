import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { cn } from "@/lib/utils";

/**
 * معرض الصور: منزلق Carousel متكامل يدعم التمرير الأصلي (scroll-snap)
 * مع أزرار تنقل تفاعلية (يمين/يسار)، ونقاط تثبيت مرنة (Anchors) تدعم أي عدد من الصور،
 * واستعراض الصورة بملء الشاشة (Lightbox Modal).
 */
export default function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images = SITE_CONFIG.photos.gallery;
  const count = images.length;

  // تحديث النقطة الفعالة حسب الصورة الأكثر مركزية في الحاوية
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateActiveSlide = () => {
      const containerRect = el.getBoundingClientRect();
      const center = containerRect.left + containerRect.width / 2;
      let closestIndex = 0;
      let smallestDistance = Infinity;

      el.querySelectorAll<HTMLElement>("[data-slide]").forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(childCenter - center);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = i;
        }
      });
      setActive(closestIndex);
    };

    el.addEventListener("scroll", updateActiveSlide, { passive: true });
    updateActiveSlide();
    return () => el.removeEventListener("scroll", updateActiveSlide);
  }, []);

  // تمرير النقطة الفعالة داخل شريط نقاط التثبيت عند تغيير الصورة النشطة
  useEffect(() => {
    const dotsTrack = dotsContainerRef.current;
    if (!dotsTrack) return;
    const activeDot = dotsTrack.children[active] as HTMLElement | undefined;
    if (activeDot) {
      activeDot.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  // الانتقال إلى صورة محددة باستخدام scrollIntoView لتطابق تام في RTL
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const slides = el.querySelectorAll<HTMLElement>("[data-slide]");
    const target = slides[index];
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  // التنقل لليمين (الصورة السابقة في واجهات RTL)
  const handlePrev = useCallback(() => {
    const nextIndex = Math.max(0, active - 1);
    scrollToIndex(nextIndex);
  }, [active, scrollToIndex]);

  // التنقل لليشار (الصورة التالية في واجهات RTL)
  const handleNext = useCallback(() => {
    const nextIndex = Math.min(count - 1, active + 1);
    scrollToIndex(nextIndex);
  }, [active, count, scrollToIndex]);

  // دعم لوحة المفاتيح للتنقل بين الصور عند ضبط التركيز
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handlePrev();
    } else if (e.key === "ArrowLeft") {
      handleNext();
    }
  };

  // التحكم باللايت بوكس بواسطة لوحة المفاتيح (Esc للإنهاء، أسهم للتنقل)
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev !== null ? Math.max(0, prev - 1) : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null ? Math.min(count - 1, prev + 1) : null
        );
      }
    };

    window.addEventListener("keydown", handleModalKeyDown);
    return () => window.removeEventListener("keydown", handleModalKeyDown);
  }, [selectedImageIndex, count]);

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="لحظات لا تُنسى"
        title="معرض الصور"
        subtitle="لمحات من أجمل ذكريات قصة حبّنا"
      />

      {/* حاوية المنزلق والتحكم */}
      <div className="relative mt-12 group/carousel">
        {/* زر التمرير إلى اليمين (السابقة) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={active === 0}
          aria-label="الصورة السابقة"
          className="gallery-nav-btn absolute right-1 top-1/2 z-20 -translate-y-1/2 opacity-90 hover:opacity-100 sm:-right-1"
        >
          <ChevronRight className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* زر التمرير إلى اليسار (التالية) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={active === count - 1}
          aria-label="الصورة التالية"
          className="gallery-nav-btn absolute left-1 top-1/2 z-20 -translate-y-1/2 opacity-90 hover:opacity-100 sm:-left-1"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* المنزلق الرئيسي */}
        <div
          ref={scrollerRef}
          role="region"
          aria-label="معرض الصور"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="gallery-scroller"
        >
          {images.map((src, index) => (
            <motion.figure
              key={src}
              data-slide
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative h-[22rem] cursor-pointer overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-gold/40 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl sm:h-[26rem]"
            >
              <img
                src={src}
                alt={`ذكرى ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* غطاء تدرج وتأثير تحويم */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#59233a]/70 via-transparent to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

              {/* أيقونة التكبير عند التحويم */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-wine shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                  <Maximize2 className="h-6 w-6" />
                </span>
              </div>

              {/* ملصق الصورة */}
              <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-wine shadow-md backdrop-blur-md border border-gold/30">
                💗 ذكرى {index + 1} / {count}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* شريط نقاط التثبيت (Anchors Pagination) المستجيب لأي عدد صور */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3" dir="rtl">
        {/* نقاط التثبيت داخل حاوية قابلة للتمرير السلس */}
        <div
          ref={dotsContainerRef}
          className="no-scrollbar flex max-w-xs items-center gap-2 overflow-x-auto rounded-full border border-gold/30 bg-white/60 px-4 py-2.5 shadow-inner backdrop-blur-md sm:max-w-md"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`الانتقال إلى صورة ${i + 1}`}
              className={cn(
                "h-2.5 shrink-0 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-gradient-to-l from-gold-dark to-gold shadow-sm"
                  : "w-2.5 bg-wine/30 hover:bg-wine/50"
              )}
            />
          ))}
        </div>

        {/* مؤشر رقمي أنيق للصور */}
        <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-bold text-wine border border-wine/20">
          الصورة {active + 1} من {count}
        </span>
      </div>

      {/* نافذة استعراض الصورة بملء الشاشة (Lightbox Modal) */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            {/* زر الإغلاق */}
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="إغلاق"
              className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>

            {/* أزرار التنقل داخل النظرة المكبرة */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev !== null ? Math.max(0, prev - 1) : null
                );
              }}
              disabled={selectedImageIndex === 0}
              aria-label="الصورة السابقة"
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev !== null ? Math.min(count - 1, prev + 1) : null
                );
              }}
              disabled={selectedImageIndex === count - 1}
              aria-label="الصورة التالية"
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* محتوى الصورة المكبرة */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl border border-gold/50 bg-wine/90 shadow-2xl"
            >
              <img
                src={images[selectedImageIndex]}
                alt={`صورة مكبرة ${selectedImageIndex + 1}`}
                className="max-h-[78vh] w-auto object-contain"
              />
              <div className="flex items-center justify-between bg-black/40 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm">
                <span>💗 ذكرى {selectedImageIndex + 1} من {count}</span>
                <span className="text-xs font-normal opacity-80">
                  استخدم الأسهم للتنقل • ESC للإغلاق
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}