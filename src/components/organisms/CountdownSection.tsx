import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import CountdownCounter from "@/components/molecules/CountdownCounter";
import { Button } from "@/components/ui/button";

function buildCalendarUrl(): string {
  const start = new Date(SITE_CONFIG.weddingDate);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `خطوبة ${SITE_CONFIG.couple.groom} و ${SITE_CONFIG.couple.bride}`,
    dates: `${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    details: `${SITE_CONFIG.venue.name}، ${SITE_CONFIG.venue.address}، ${SITE_CONFIG.venue.city}`,
    location: `${SITE_CONFIG.venue.name}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function CountdownSection() {
  const { dateLabel, timeLabel } = SITE_CONFIG;

  return (
    <section
      id="countdown"
      className="relative overflow-hidden py-24"
    >
      {/* خلفية مموّجة زهرية */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blush/60 to-transparent" />
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(#f2b8cf_1.5px,transparent_1.5px)] [background-size:34px_34px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <OrnamentDivider className="mb-8" />
        <SectionTitle
          eyebrow="قلوبنا معلقة باللحظة"
          title="عدّاد الوقت المتبقي"
          subtitle={`سنجتمع جميعًا يوم ${dateLabel} — ${timeLabel}`}
        />

        <div className="mt-12">
          <CountdownCounter />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            variant="gold"
            size="lg"
            className="gap-2 font-bold"
          >
            <a href={buildCalendarUrl()} target="_blank" rel="noreferrer">
              <CalendarPlus className="h-5 w-5" />
              أضف الخطوبة إلى تقويمك
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}