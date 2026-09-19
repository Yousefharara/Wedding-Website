import type { SiteConfig } from "@/@types/wedding";
import { gl_1, gl_2 } from "@/assets/images";
import { gl_3 } from "@/assets/images";
import { gl_4 } from "@/assets/images";
import { gl_5 } from "@/assets/images";
import { gl_6 } from "@/assets/images";
import { gl_7 } from "@/assets/images";
import { gl_8 } from "@/assets/images";
import { gl_9 } from "@/assets/images";
import { gl_10 } from "@/assets/images";

const emailjs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
};

export const SITE_CONFIG: SiteConfig = {
  couple: {
    groom: "عمر",
    bride: "جنا",
    groomEn: "Omar",
    brideEn: "Jana",
  },
  // غيّر هذا التاريخ والساعة لموعد خطوبتكم الفعلي
  weddingDate: "2026-10-10T19:00:00+03:00",
  dateLabel: "الخميس، 10 أكتوبر 2026",
  timeLabel: "الساعة 5:00 مساءً",
  venue: {
    name: "قاعة الأميرات للمناسبات",
    address: "شارع النيل، أمام الكورنيش",
    city: "القاهرة، مصر",
    mapsUrl: "https://maps.google.com/?q=30.0444,31.2357",
  },
  verse: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾",
  verseRef: "سورة الروم — الآية 21",
  photos: {
    hero: gl_2,
    gallery: [
      gl_1,
      gl_2,
      gl_3,
      gl_4,
      gl_5,
      gl_6,
      gl_7,
      gl_8,
      gl_9,
      gl_10,
    ],
  },
  socials: {
    instagram: "https://instagram.com",
    whatsappNumber: "201000000000",
    hashtag: "#عمر_وجنا",
  },
  emailjs,
  musicUrl: "/music/wedding.mp3",
};