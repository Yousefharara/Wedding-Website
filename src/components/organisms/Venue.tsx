import { motion } from "framer-motion";
import { Copy, MapPin, Navigation, Clock } from "lucide-react";
import { toast } from "sonner";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Venue() {
  const { venue, timeLabel } = SITE_CONFIG;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.name}، ${venue.address}، ${venue.city}`);
      toast.success("تم نسخ العنوان بنجاح");
    } catch {
      toast.error("تعذر النسخ");
    }
  };

  return (
    <section id="venue" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="يسرنا استقبالكم في"
        title="مكان إقامة الحفل"
        subtitle="نتشرّف بحضوركم ونسعد بشهادة حضوركم في يوم زفافنا"
      />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto mt-12 max-w-3xl"
      >
        <Card className="overflow-hidden border-gold/30">
          {/* خريطة تزيينية */}
          <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-[#ffe9f0] via-[#fdeef4] to-[#f9e2d4]">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#f2d6e0_1px,transparent_1px),linear-gradient(90deg,#f2d6e0_1px,transparent_1px)] [background-size:28px_28px]" />
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-[#b34d79] p-4 text-white shadow-xl shadow-primary/40"
            >
              <MapPin className="h-8 w-8" />
            </motion.span>
            <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-wine backdrop-blur-sm">
              📍 {venue.city}
            </span>
          </div>

          <div className="p-7 sm:p-9">
            <h3 className="text-center font-calligraphy text-3xl font-bold text-wine">
              {venue.name}
            </h3>

            <div className="mt-6 space-y-3 text-center">
              <p className="flex items-center justify-center gap-2 text-base text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {venue.address} — {venue.city}
              </p>
              <p className="flex items-center justify-center gap-2 text-base font-semibold text-wine">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                موعد الاستقبال: {timeLabel}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                variant="gold"
                size="lg"
                className="gap-2 font-bold"
              >
                <a href={venue.mapsUrl} target="_blank" rel="noreferrer">
                  <Navigation className="h-5 w-5" />
                  افتح في خرائط جوجل
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={copyAddress}
                className="font-bold"
              >
                <Copy className="h-4 w-4" />
                نسخ العنوان
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}