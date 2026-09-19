import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Door from "./Door";
import WeddingCard from "./WeddingCard";

interface IntroSequenceProps {
  onFinish: () => void;
}

type Phase = "card" | "door";

/**
 * يتسلسل الافتتاح: بطاقة الخطوبة -> الباب وصالة الحفل -> اختفاء تدريجي.
 */
export default function IntroSequence({ onFinish }: IntroSequenceProps) {
  const [phase, setPhase] = useState<Phase>("card");
  const [visible, setVisible] = useState(true);

  const handleCardComplete = () => setPhase("door");

  const handleDoorComplete = () => {
    setVisible(false);
    onFinish();
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60]"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {phase === "card" ? (
              <WeddingCard key="card" onComplete={handleCardComplete} />
            ) : (
              <Door key="door" onComplete={handleDoorComplete} />
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleDoorComplete}
            className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-xs font-semibold text-wine/80 backdrop-blur-sm transition hover:bg-white/40"
          >
            تخطي المقدمة ⏭
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}