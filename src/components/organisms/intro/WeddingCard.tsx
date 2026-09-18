import { useEffect } from "react";
import { motion } from "framer-motion";

import { SITE_CONFIG } from "@/constants/site";

interface WeddingCardProps {
  onComplete: () => void;
}

const TOTAL_DURATION_MS = 5200;

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  duration: 7 + Math.random() * 5,
  delay: Math.random() * 6,
  size: 13 + Math.random() * 15,
  sway: 18 + Math.random() * 30,
}));

function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 select-none"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          animate={{
            y: ["-8vh", "108vh"],
            x: [0, p.sway, -p.sway, 0],
            rotate: [0, 160, 320],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌸
        </motion.span>
      ))}
    </div>
  );
}

function SmallHeart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/**
 * افتتاحية البطاقة بملء الشاشة: تنفتح كبطاقة بريد بتقريب 3D.
 * الغلاف يملأ الشاشة كاملة ثم ينطوي نصفاه للخارج ليكشفا المحتوى الداخلي.
 */
export default function WeddingCard({ onComplete }: WeddingCardProps) {
  const { couple, dateLabel } = SITE_CONFIG;

  useEffect(() => {
    const timer = window.setTimeout(onComplete, TOTAL_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const coverGradient =
    "bg-gradient-to-bl from-[#fde3ec] via-[#fbd6e3] to-[#f6c3d6]";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fdeef4]">
      <FallingPetals />

      {/* توهج خلفي */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,216,162,0.45),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ perspective: 2400 }}
      >
        {/* ===== الصفحة الداخلية (تظهر بعد فتح الغلاف) ===== */}
        <div className="absolute inset-0">
          {/* النصف الأيمن - طلب الحضور */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-[#fffdf9] to-[#ffeee6]">
            <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center sm:px-12">
              <span className="absolute inset-5 rounded-2xl border border-gold/40 sm:inset-8" />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.5, type: "spring" }}
                className="text-gold-dark"
              >
                <SmallHeart className="h-6 w-6 sm:h-8 sm:w-8" />
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7 }}
                className="font-calligraphy text-2xl font-bold leading-snug text-wine sm:text-4xl"
              >
                يدعوكم
                <br />
                {couple.groom} {couple.bride}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.7 }}
                className="text-sm font-semibold text-gold-dark sm:text-lg"
              >
                لمشاركة أجمل لحظات العمر
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.7 }}
                className="mt-1 border-t border-dashed border-gold/50 pt-3 text-sm text-wine/75 sm:text-base"
              >
                {dateLabel}
              </motion.div>
            </div>
          </div>

          {/* النصف الأيسر - الآية الكريمة */}
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-bl from-[#ffffff] to-[#ffeadf]">
            <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center sm:px-12">
              <span className="absolute inset-5 rounded-2xl border border-gold/40 sm:inset-8" />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.75, duration: 0.7 }}
                className="font-quran text-sm leading-8 text-wine/85 sm:text-xl sm:leading-[2.4]"
              >
                {SITE_CONFIG.verse}
              </motion.p>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
                className="text-gold-dark"
              >
                <SmallHeart className="h-5 w-5 sm:h-7 sm:w-7" />
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.35, duration: 0.7 }}
                className="text-sm font-semibold text-gold-dark sm:text-base"
              >
                يسعدنا حضوركم وتشريفكم
              </motion.p>
            </div>
          </div>

          {/* خط الطيّ في المنتصف */}
          <div className="absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-gold/50" />
          <div className="absolute inset-y-0 left-1/2 z-10 w-6 -translate-x-1/2 shadow-[0_0_24px_2px_rgba(201,162,90,0.25)]" />
        </div>

        {/* ===== الغلاف - النصف الأيمن (عنوان الدعوة) ===== */}
        <motion.div
          className="absolute right-0 top-0 z-20 h-full w-1/2"
          style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 100 }}
          transition={{ delay: 1.15, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className={`relative flex h-full w-full flex-col items-center justify-center gap-4 ${coverGradient} px-6 text-center sm:px-12`}
          >
            <span className="absolute inset-5 rounded-2xl border-2 border-gold/70 sm:inset-8" />
            <span className="absolute left-5 top-5 text-xl text-gold-dark/80 sm:text-2xl">❀</span>
            <span className="absolute bottom-5 left-5 text-xl text-gold-dark/80 sm:text-2xl">❀</span>

            <h1 className="font-calligraphy text-3xl font-bold leading-relaxed text-wine sm:text-6xl">
              دَعْوَةُ زِفَاف
            </h1>
            <div className="flex items-center gap-3 text-gold-dark">
              <span className="h-px w-10 bg-gold-dark/60 sm:w-16" />
              <SmallHeart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="h-px w-10 bg-gold-dark/60 sm:w-16" />
            </div>
            <p className="text-lg font-semibold text-wine/80 sm:text-3xl">
              {couple.groom} &amp; {couple.bride}
            </p>
            <span className="rounded-full border border-gold/60 bg-white/40 px-4 py-1.5 text-xs font-bold text-wine/80 sm:px-6 sm:text-sm">
              {dateLabel}
            </span>
          </div>
        </motion.div>

        {/* ===== الغلاف - النصف الأيسر (الاسمين بالخط اللاتيني) ===== */}
        <motion.div
          className="absolute left-0 top-0 z-20 h-full w-1/2"
          style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -100 }}
          transition={{ delay: 1.15, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className={`relative flex h-full w-full flex-col items-center justify-center gap-4 ${coverGradient} px-6 text-center sm:px-12`}
          >
            <span className="absolute inset-5 rounded-2xl border-2 border-gold/70 sm:inset-8" />
            <span className="absolute right-5 top-5 text-xl text-gold-dark/80 sm:text-2xl">❀</span>
            <span className="absolute bottom-5 right-5 text-xl text-gold-dark/80 sm:text-2xl">❀</span>

            <span className="font-script text-3xl leading-none text-gold-dark/85 sm:text-5xl">
              Omar ♥ Jana
            </span>
            <div className="flex items-center gap-3 text-gold-dark">
              <span className="h-px w-10 bg-gold-dark/60 sm:w-16" />
              <SmallHeart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="h-px w-10 bg-gold-dark/60 sm:w-16" />
            </div>
            <p className="font-calligraphy text-2xl font-bold leading-snug text-wine sm:text-4xl">
              عِيدَي الْفَـرَحِ
              <br />
              يَلُمّنا جميعًا
            </p>
            <span className="text-xs font-semibold text-wine/70 sm:text-sm">
              نتشرف بقدومكم ومشاركتنا الفرحة
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}