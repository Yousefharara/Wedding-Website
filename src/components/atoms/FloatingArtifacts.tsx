import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ArtifactKind = "heart" | "sparkle" | "flower" | "ring";

interface FloatingArtifact {
  id: number;
  emoji: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

const ARTIFACTS: Record<ArtifactKind, string> = {
  heart: "💖",
  sparkle: "✨",
  flower: "🌸",
  ring: "💍",
};

const SIDES = ["top", "bottom", "left", "right"] as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T extends string>(value: readonly T[]): T {
  return value[Math.floor(Math.random() * value.length)];
}

const BASE_POOL: ArtifactKind[] = [
  "heart",
  "heart",
  "heart",
  "heart",
  "sparkle",
  "sparkle",
  "flower",
  "ring",
];

interface FloatingArtifactsProps {
  enabled?: boolean;
  count?: number;
  interval?: number;
  className?: string;
}

/**
 * طبقة عائمة تملأ الشاشة بقلوب وزخارف لطيفة تظهر وتختفي من كل الجوانب.
 */
export default function FloatingArtifacts({
  enabled = true,
  count = 14,
  interval = 950,
  className = "",
}: FloatingArtifactsProps) {
  const [artifacts, setArtifacts] = useState<FloatingArtifact[]>([]);
  const idRef = useRef(0);
  const spawnTimer = useRef<number | null>(null);

  const spawn = useCallback(() => {
    if (!enabled) return;

    const side = pick(SIDES);
    const size = randomBetween(18, 42);
    const duration = randomBetween(7, 13);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const randX = () => randomBetween(0.05, 0.95) * w;
    const randY = () => randomBetween(0.05, 0.95) * h;

    let from: FloatingArtifact["from"];
    let to: FloatingArtifact["to"];

    if (side === "top") {
      from = { x: randX(), y: -size };
      to = { x: randX(), y: randomBetween(0.1, 0.9) * h };
    } else if (side === "bottom") {
      from = { x: randX(), y: h + size };
      to = { x: randX(), y: randomBetween(0.1, 0.9) * h };
    } else if (side === "left") {
      from = { x: -size, y: randY() };
      to = { x: randomBetween(0.1, 0.9) * w, y: randY() };
    } else {
      from = { x: w + size, y: randY() };
      to = { x: randomBetween(0.1, 0.9) * w, y: randY() };
    }

    const kind = pick(BASE_POOL);

    setArtifacts((prev) =>
      [...prev, {
        id: idRef.current++,
        emoji: ARTIFACTS[kind],
        from,
        to,
        size,
        duration,
        delay: randomBetween(0, 0.8),
        drift: randomBetween(-60, 60),
      }].slice(-count),
    );
  }, [count, enabled]);

  useEffect(() => {
    spawn();
    spawnTimer.current = window.setInterval(spawn, interval);
    return () => {
      if (spawnTimer.current) window.clearInterval(spawnTimer.current);
    };
  }, [spawn, interval]);

  const remove = (id: number) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[2] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {artifacts.map((a) => (
          <motion.div
            key={a.id}
            initial={{
              opacity: 0,
              x: a.from.x,
              y: a.from.y,
              scale: 0.2,
              rotate: -30,
            }}
            animate={{
              x: [a.from.x, a.to.x + a.drift, a.to.x],
              y: [a.from.y, a.to.y, a.to.y + a.drift],
              opacity: [0, 0.95, 0.95, 0],
              scale: [1, 1.15, 1, 0.7],
              rotate: [-30, 15, 30],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: a.duration,
              delay: a.delay,
              times: [0, 0.6, 0.85, 1],
              ease: "easeInOut",
            }}
            onAnimationComplete={() => remove(a.id)}
            style={{ fontSize: a.size }}
            className="absolute drop-shadow-md"
          >
            {a.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}