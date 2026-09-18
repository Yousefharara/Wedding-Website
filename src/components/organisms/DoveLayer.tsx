import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Dove from "@/components/molecules/Dove";

interface DoveFlight {
  id: number;
  startSide: "left" | "right";
  startTop: number;
  endTop: number;
  duration: number;
  size: number;
  delay: number;
}

/**
 * طبقة حمامات ترفرف من جانب إلى آخر عبر الشاشة بين الحين والآخر.
 */
export default function DoveLayer() {
  const [doves, setDoves] = useState<DoveFlight[]>([]);
  const idRef = useRef(0);

  const spawn = useCallback(() => {
    const vh = window.innerHeight;
    const startTop = window.innerHeight * 0.1 + Math.random() * vh * 0.45;

    setDoves((prev) => {
      const current: DoveFlight = {
        id: idRef.current++,
        startSide: Math.random() > 0.5 ? "left" : "right",
        startTop,
        endTop: startTop + (Math.random() - 0.5) * 90,
        duration: 11 + Math.random() * 6,
        size: 44 + Math.random() * 34,
        delay: Math.random() * 3,
      };
      return [...prev.slice(-1), current];
    });
  }, []);

  useEffect(() => {
    spawn();
    const timer = window.setInterval(spawn, 9000);
    return () => window.clearInterval(timer);
  }, [spawn]);

  const remove = (id: number) => {
    setDoves((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {doves.map((dove) => {
          const flyingRight = dove.startSide === "left";
          return (
            <motion.div
              key={dove.id}
              className="absolute"
              style={{ top: dove.startTop }}
              initial={{
                x: flyingRight ? -dove.size - 20 : window.innerWidth + 20,
                opacity: 0,
              }}
              animate={{
                x: flyingRight ? window.innerWidth + 20 : -dove.size - 20,
                top: [dove.startTop, dove.endTop, dove.startTop],
                opacity: [0, 1, 1, 0],
                rotate: [0, 3, -3, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: dove.duration,
                delay: dove.delay,
                times: [0, 0.18, 0.85, 1],
                ease: "linear",
              }}
              onAnimationComplete={() => remove(dove.id)}
            >
              <Dove size={dove.size} flip={!flyingRight} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}