import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Heart } from "lucide-react";
import { toast } from "sonner";

import { SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => {
      toast.error("أضف ملف الأغنية في المسار public/music/wedding.mp3");
    };
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  // تشغيل تلقائي بعد أول تفاعل مع الصفحة
  useEffect(() => {
    const enable = () => {
      audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => {});
      window.removeEventListener("pointerdown", enable);
    };
    window.addEventListener("pointerdown", enable);
    return () => window.removeEventListener("pointerdown", enable);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => toast.error("تعذر تشغيل الأغنية"));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SITE_CONFIG.musicUrl} loop preload="none" />

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className={cn(
          "fixed bottom-6 left-6 z-40 flex h-16 w-16 items-center justify-center rounded-full transition-shadow",
          playing
            ? "animate-pulse-ring shadow-xl shadow-primary/40"
            : "shadow-lg",
        )}
        style={{
          background:
            "conic-gradient(from 0deg, #8a5a2a, #e9c984, #9a7430, #f3dc9a, #8a5a2a)",
        }}
        aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#b34d79] text-white">
          <Music className={cn("h-6 w-6", playing && "animate-[slow-spin_3s_linear_infinite]")} />
        </span>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
          <Heart className={cn("h-3 w-3 fill-primary text-primary", !playing && "opacity-30")} />
        </span>
      </motion.button>
    </>
  );
}