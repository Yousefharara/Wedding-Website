import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/hooks/useSmoothScroll";

const LINKS = [
  { id: "gallery", label: "معرض الصور" },
  { id: "venue", label: "مكان الحفل" },
  { id: "program", label: "البرنامج" },
  { id: "countdown", label: "العد التنازلي" },
  { id: "rsvp", label: "تأكيد الحضور" },
  { id: "guestbook", label: "صندوق التهنئة" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 border-b border-transparent top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-white/75 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="container-md flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2"
        >
          <span className="rounded-full bg-gradient-to-br from-primary to-[#b34d79] px-3 py-1.5 text-sm font-bold text-white shadow-md">
            {SITE_CONFIG.couple.groom[0]}♥{SITE_CONFIG.couple.bride[0]}
          </span>
          <span className="font-script text-xl leading-none text-wine">
            {SITE_CONFIG.couple.groomEn} &amp; {SITE_CONFIG.couple.brideEn}
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-wine/80 transition hover:bg-blush hover:text-primary"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollToSection("rsvp")}
          className="rounded-full bg-gradient-to-l from-gold-dark via-gold to-gold-dark px-5 py-2 text-sm font-bold text-white shadow-md shadow-gold-dark/20 transition hover:brightness-110"
        >
          احجز مقعدك
        </button>
      </nav>
    </motion.header>
  );
}