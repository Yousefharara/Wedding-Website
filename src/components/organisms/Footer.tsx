import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Copy, Check, Share2, Heart } from "lucide-react";
import { toast } from "sonner";

import { SITE_CONFIG } from "@/constants/site";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { couple, socials, venue, dateLabel, timeLabel } = SITE_CONFIG;
  const [copied, setCopied] = useState(false);

  const inviteMessage = `🌹 دعوة خطوبة 🌹\nيُشرّفنا حضوركم ودعوتكم لحضور حفل خطوبة ${couple.groom} و ${couple.bride}\n📅 ${dateLabel} — ${timeLabel}\n📍 ${venue.name}، ${venue.address}، ${venue.city}\n${window.location.href}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("تم نسخ رابط الدعوة");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("تعذر نسخ الرابط");
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border/70 bg-white/50 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-quran text-lg leading-relaxed text-wine">
            ودمتم أهلاً لأسعد اللحظات
          </p>

          <h3 className="mt-6 font-calligraphy text-4xl font-bold text-wine">
            {couple.groom}
            <Heart className="mx-3 inline-block h-6 w-6 fill-primary text-primary" />
            {couple.bride}
          </h3>

          <button
            type="button"
            onClick={() => window.open(socials.instagram, "_blank", "noopener")}
            className="mt-2 inline-block text-sm font-semibold text-primary transition hover:text-primary/70"
          >
            {socials.hashtag}
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="gold"
              onClick={shareWhatsApp}
              className="gap-2 font-bold"
            >
              <Share2 className="h-5 w-5" />
              شارك الدعوة
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={copyLink}
              className="gap-2 font-bold"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
              {copied ? "تم النسخ" : "نسخ الرابط"}
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 font-bold">
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5 text-primary" />
                انستغرام
              </a>
            </Button>
          </div>

          <p className="mt-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} — دعوة خطوبة {couple.groom} و {couple.bride}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            صُنع بكل الحب{" "}
            <Heart className="inline-block h-3.5 w-3.5 fill-primary text-primary" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}