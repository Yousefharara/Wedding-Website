import { useEffect } from "react";
import { motion } from "framer-motion";

import { SITE_CONFIG } from "@/constants/site";
import doorLeft from "@/assets/images/door-left.png";
import hallImage from "@/assets/images/Marriage hall.jpg";

interface DoorProps {
  onComplete: () => void;
}

const TOTAL_DURATION_MS = 4800;

/**
 * افتتاحية الباب: بابان يفتحان من الوسط ليكشِفان صالة الحفل (صورة حقيقية) مع تقريب للصالة.
 */
export default function Door({ onComplete }: DoorProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, TOTAL_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#1c0f14]"
      style={{ perspective: 1500 }}
    >
      {/* الصالة الحقيقية خلف البابين */}
      <motion.div
        initial={{ scale: 1, opacity: 0.85 }}
        animate={{ scale: 1.6, opacity: 1 }}
        transition={{ delay: 1.7, duration: 2.6, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <img
          src={hallImage}
          alt="صالة الحفل"
          className="h-full w-full object-cover"
        />
        {/* تظليل سفلي للقراءة + لمسة علوية */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0f1d]/75 via-transparent to-[#2a0f1d]/25" />

        {/* القلب الوامض في قلب الصالة */}
        <motion.span
          className="absolute left-1/2 top-[42%] -translate-x-1/2 text-4xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          aria-hidden="true"
        >
          💖
        </motion.span>

        <div className="absolute inset-x-0 bottom-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="font-calligraphy text-xl text-amber-50 drop-shadow-lg sm:text-2xl"
          >
            أهلًا بكم في حفل خطوبة {SITE_CONFIG.couple.groom} &amp;{" "}
            {SITE_CONFIG.couple.bride}
          </motion.p>
        </div>
      </motion.div>

      {/* الباب الأيسر (الصورة الأصلية) */}
      <motion.div
        className="absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden"
        style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -110 }}
        transition={{ delay: 1, duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
      >
        <img
          src={doorLeft}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </motion.div>

      {/* الباب الأيمن (نفس الصورة مع فلِب أفقي) */}
      <motion.div
        className="absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden"
        style={{ transformOrigin: "right center", backfaceVisibility: "hidden" }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 110 }}
        transition={{ delay: 1, duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
      >
        <img
          src={doorLeft}
          alt=""
          className="-scale-x-100 h-full w-full object-cover object-center"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}