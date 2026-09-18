export interface CoupleConfig {
  groom: string;
  bride: string;
  groomEn: string;
  brideEn: string;
}

export interface VenueConfig {
  name: string;
  address: string;
  city: string;
  mapsUrl: string;
}

export interface EmailjsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface SocialsConfig {
  instagram: string;
  whatsappNumber: string;
  hashtag: string;
}

export interface SiteConfig {
  couple: CoupleConfig;
  weddingDate: string;
  dateLabel: string;
  timeLabel: string;
  venue: VenueConfig;
  verse: string;
  verseRef: string;
  photos: {
    hero: string;
    gallery: string[];
  };
  socials: SocialsConfig;
  emailjs: EmailjsConfig;
  musicUrl: string;
}