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
    hero: "src/assets/images/gallery/gallery2.jpg",
    gallery: [
      "src/assets/images/gallery/gallery1.jpg",
      "src/assets/images/gallery/gallery2.jpg",
      "src/assets/images/gallery/gallery3.jpg",
      "src/assets/images/gallery/gallery4.jpg",
      "src/assets/images/gallery/gallery5.jpg",
      "src/assets/images/gallery/gallery6.jpg",
      "src/assets/images/gallery/gallery7.jpg",
      "src/assets/images/gallery/gallery8.jpg",
      "src/assets/images/gallery/gallery9.jpg",
      "src/assets/images/gallery/gallery10.jpg",
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