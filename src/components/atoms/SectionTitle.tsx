import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      {eyebrow ? (
        <span className="mb-2 inline-block text-sm font-semibold tracking-wide text-gold-dark">
          — {eyebrow} —
        </span>
      ) : null}
      <h2 className="font-calligraphy text-4xl font-bold leading-snug text-wine sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}