import { motion } from "framer-motion";

import { useCountdown } from "@/hooks/useCountdown";
import FlipUnit from "./FlipUnit";

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex gap-1.5 sm:gap-2">
        {value.split("").map((char, i) => (
          <FlipUnit key={`${value}-${i}`} value={char} />
        ))}
      </div>
      <span className="text-sm font-bold text-wine/80">{label}</span>
    </div>
  );
}

function Colon() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="hidden pt-9 text-3xl font-black text-gold-dark sm:block"
      aria-hidden="true"
    >
      :
    </motion.span>
  );
}

export default function CountdownCounter() {
  const { days, hours, minutes, seconds, ended } = useCountdown();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-start justify-center"
      dir="rtl"
    >
      <div className="flex items-start gap-3 sm:gap-5">
        <Unit value={days} label="أيام" />
        {!ended ? <Colon /> : null}
        <Unit value={hours} label="ساعات" />
        {!ended ? <Colon /> : null}
        <Unit value={minutes} label="دقائق" />
        {!ended ? <Colon /> : null}
        <Unit value={seconds} label="ثواني" />
      </div>
    </motion.div>
  );
}