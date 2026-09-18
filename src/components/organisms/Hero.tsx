import { motion } from "framer-motion";
import { CalendarHeart, Clock, Heart } from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";
import { scrollToSection } from "@/hooks/useSmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { couple, verse, verseRef, dateLabel, timeLabel, photos } = SITE_CONFIG;

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 sm:px-6"
    >
      {/* الآية الكريمة */}
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="relative max-w-3xl text-center"
      >
        <span
          className="pointer-events-none absolute -top-7 right-2 font-quran text-6xl text-gold/40"
          aria-hidden="true"
        >
          ﴿
        </span>
        <p className="font-quran text-xl leading-[2.2] text-wine sm:text-2xl sm:leading-[2.3]">
          {verse}
        </p>
        <span className="mt-2 inline-block text-sm font-semibold text-gold-dark">
          {verseRef}
        </span>
      </motion.blockquote>

      {/* الأسماء */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        className="mt-10 flex flex-col items-center"
      >
        <span className="font-script text-2xl text-gold-dark">
          Omar &amp; Jana
        </span>
        <div className="mt-2 flex items-center gap-5 sm:gap-7">
          <span className="font-calligraphy text-6xl font-bold text-wine drop-shadow-sm sm:text-7xl">
            {couple.groom}
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl sm:text-5xl"
          >
            <Heart className="h-10 w-10 fill-primary text-primary sm:h-12 sm:w-12" />
          </motion.span>
          <span className="font-calligraphy text-6xl font-bold text-wine drop-shadow-sm sm:text-7xl">
            {couple.bride}
          </span>
        </div>
      </motion.div>

      {/* التاريخ والوقت */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-5 py-2.5 text-sm font-bold text-wine shadow-sm backdrop-blur-sm">
          <CalendarHeart className="h-4 w-4 text-primary" />
          {dateLabel}
        </span>
        <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-5 py-2.5 text-sm font-bold text-wine shadow-sm backdrop-blur-sm">
          <Clock className="h-4 w-4 text-primary" />
          {timeLabel}
        </span>
      </motion.div>

      {/* الصورة */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE }}
        className="relative mt-12"
      >
        {/* هالات خلفية */}
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,102,143,0.25),transparent_65%)]" />
        <div className="animate-slow-spin absolute left-1/2 top-[calc(50%-1px)] h-[24.5rem] w-[24.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gold/40 sm:h-[27rem] sm:w-[27rem]" />

        {/* إطار قوسي ذهبي مزدوج */}
        <div className="relative h-[21rem] w-[17rem] overflow-hidden rounded-t-full rounded-b-[2.4rem] border-[6px] border-gold/80 shadow-2xl shadow-primary/20 sm:h-[23rem] sm:w-[18.5rem]">
          <img
            src={photos.hero}
            alt={`${couple.groom} و ${couple.bride}`}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff6f8]/40 to-transparent" />
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-l from-gold-dark via-gold to-gold-dark px-6 py-2 font-calligraphy text-sm font-bold text-white shadow-lg">
          {dateLabel}
        </span>

        {/* قلوب طائرة حول الصورة */}
        <motion.span
          className="animate-float-y absolute -left-6 top-16 text-3xl"
          aria-hidden="true"
        >
          💖
        </motion.span>
        <motion.span
          className="animate-float-y absolute -right-7 top-24 text-2xl"
          style={{ animationDelay: "0.8s" }}
          aria-hidden="true"
        >
          🕊️
        </motion.span>
        <motion.span
          className="animate-float-y absolute -right-4 bottom-16 text-xl"
          style={{ animationDelay: "1.4s" }}
          aria-hidden="true"
        >
          🌹
        </motion.span>
      </motion.div>

      {/* مؤشر التمرير */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("gallery")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-gold-dark/80"
        aria-label="انتقل للأسفل"
      >
        <span className="text-xs font-semibold">اسحب للأسفل</span>
        <motion.svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>
    </section>
  );
}