import type { LucideIcon } from "lucide-react";
import {
  GlassWater,
  HeartHandshake,
  Utensils,
  Music4,
  Camera,
} from "lucide-react";
import { motion } from "framer-motion";

import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { cn } from "@/lib/utils";

interface ProgramItem {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const PROGRAM: ProgramItem[] = [
  {
    time: "7:00 م",
    title: "استقبال الضيوف",
    description: "باب الاستقبال مفتوح ورحابة صدر تنتظركم مع الضيافة",
    icon: GlassWater,
  },
  {
    time: "8:00 م",
    title: "عقد القران",
    description: "مراسم عقد القران بحضوركم المبارك بإذن الله",
    icon: HeartHandshake,
  },
  {
    time: "9:00 م",
    title: "العشاء",
    description: "بوفيه العشاء والإكراميات تُقدّم للضيوف الكرام",
    icon: Utensils,
  },
  {
    time: "10:30 م",
    title: "الرقصة الأولى",
    description: "لحظة العمر مع الرقصة الأولى للعروسين",
    icon: Music4,
  },
  {
    time: "11:30 م",
    title: "التصوير والختام",
    description: "جلسات تصوير تذكارية مع اللقطات الأخيرة من الحفل",
    icon: Camera,
  },
];

export default function Program() {
  return (
    <section id="program" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="سير الحفل"
        title="برنامج الأمسية"
        subtitle="رحلة سعيدة ننتظر أن تكتمل معكم لحظة بلحظة"
      />

      <div className="relative mt-14">
        {/* الخط العمودي */}
        <div className="absolute inset-y-0 right-4 w-0.5 bg-gradient-to-b from-transparent via-gold/60 to-transparent sm:right-1/2" />

        <div className="space-y-10">
          {PROGRAM.map((item, index) => {
            const isRight = index % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={cn(
                  "relative flex items-start gap-5",
                  "sm:w-[calc(50%+1.25rem)]",
                  isRight
                    ? "sm:me-auto sm:flex-row sm:justify-end sm:text-left"
                    : "sm:ms-auto sm:flex-row-reverse sm:text-right",
                )}
              >
                {/* النقطة على الخط */}
                <span className="absolute right-4 top-7 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-gold bg-background p-1.5 sm:right-auto sm:left-1/2 sm:translate-x-[-50%]">
                  <span className="block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-[#b34d79]" />
                </span>

                <span className="w-10 shrink-0 sm:hidden" />

                <div
                  className={cn(
                    "rounded-2xl border border-gold/30 bg-white/75 p-5 shadow-lg shadow-primary/5 backdrop-blur-sm",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#b34d79] text-white shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-calligraphy text-lg font-bold text-gold-dark">
                        {item.time}
                      </span>
                      <h4 className="text-base font-bold text-wine">{item.title}</h4>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}