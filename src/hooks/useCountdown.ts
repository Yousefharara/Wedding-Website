import { useEffect, useState } from "react";

import { SITE_CONFIG } from "@/constants/site";

export interface CountdownValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  ended: boolean;
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function getCountdown(target: string): CountdownValues {
  const targetTime = new Date(target).getTime();
  const now = Date.now();
  const diff = Math.max(0, targetTime - now);

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    ended: diff <= 0,
  };
}

/**
 * عدّاد تنازلي حي لموعد الخطوبة.
 */
export function useCountdown(): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() =>
    getCountdown(SITE_CONFIG.weddingDate),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValues(getCountdown(SITE_CONFIG.weddingDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return values;
}