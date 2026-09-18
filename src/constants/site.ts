import type { SiteConfig } from "@/@types/wedding";

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
  // غيّر هذا التاريخ والساعة لموعد زفافكم الفعلي
  weddingDate: "2026-12-24T19:00:00+03:00",
  dateLabel: "الخميس، 24 ديسمبر 2026",
  timeLabel: "الساعة 7:00 مساءً",
  venue: {
    name: "قاعة الأميرات للمناسبات",
    address: "شارع النيل، أمام الكورنيش",
    city: "القاهرة، مصر",
    mapsUrl: "https://maps.google.com/?q=30.0444,31.2357",
  },
  verse: "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾",
  verseRef: "سورة الروم — الآية 21",
  photos: {
    hero: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
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