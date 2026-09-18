import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface FlipUnitProps {
  value: string;
  className?: string;
}

const HALF_MS = 190;
const FLIP_MS = HALF_MS * 2;

/**
 * خلية انقلاب رقمية بأسلوب ساعة "Flip Clock": النصف القديم ينطوي والنصف الجديد ينطوي عكسه.
 */
export default function FlipUnit({ value, className }: FlipUnitProps) {
  const [display, setDisplay] = useState(value);
  const flipping = value !== display;

  useEffect(() => {
    if (!flipping) return;
    const timer = window.setTimeout(() => setDisplay(value), FLIP_MS);
    return () => window.clearTimeout(timer);
  }, [value, flipping]);

  const glyphStyle = {
    fontSize: "1.5rem",
    lineHeight: "3.5rem",
  } as const;

  return (
    <div
      className={cn("relative w-10 sm:w-12 shadow-md rounded-lg", className)}
      style={{ height: "3.5rem", perspective: 600 }}
    >
      {/* النصف الثابت العلوي - القيمة الجديدة المستهدفة (تظهر بعد سحب النصف القديم) */}
      <div className="absolute inset-x-0 top-0 flex h-1/2 items-start justify-center overflow-hidden rounded-t-lg border border-gold/35 bg-gradient-to-b from-[#7a3357] to-[#5a2440]">
        <span style={glyphStyle} className="font-bold text-[#f3dc9a]">
          {value}
        </span>
      </div>

      {/* النصف الثابت السفلي - القيمة السابقة (تُغطى بالنصف الجديد بعد الانقلاب) */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-center overflow-hidden rounded-b-lg border-x border-b border-gold/35 bg-gradient-to-b from-[#4f2036] to-[#3c1529]">
        <span style={glyphStyle} className="font-bold text-[#f3dc9a]">
          {display}
        </span>
      </div>

      {/* خط الفصل الجمالي */}
      <div className="absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 border-t border-gold/50 bg-black/40 shadow-sm" />

      {/* الغطاء العلوي المترنح أثناء الانقلاب (من 0 إلى -90 درجة) */}
      {flipping ? (
        <motion.div
          className="absolute inset-x-0 top-0 z-20 flex h-1/2 items-start justify-center overflow-hidden rounded-t-lg border border-gold/35 bg-gradient-to-b from-[#7a3357] to-[#5a2440] shadow-md"
          style={{ transformOrigin: "bottom center", backfaceVisibility: "hidden" }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          transition={{ duration: HALF_MS / 1000, ease: "easeIn" }}
        >
          <span style={glyphStyle} className="font-bold text-[#f3dc9a]">
            {display}
          </span>
        </motion.div>
      ) : null}

      {/* الغطاء السفلي القادم أثناء الانقلاب (من 90 إلى 0 درجة) */}
      {flipping ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 flex h-1/2 items-end justify-center overflow-hidden rounded-b-lg border-x border-b border-gold/35 bg-gradient-to-b from-[#4f2036] to-[#3c1529] shadow-lg"
          style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: HALF_MS / 1000, delay: HALF_MS / 1000, ease: "easeOut" }}
        >
          <span style={glyphStyle} className="font-bold text-[#f3dc9a]">
            {value}
          </span>
        </motion.div>
      ) : null}
    </div>
  );
}