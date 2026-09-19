import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  date: number;
}

const STORAGE_KEY = "wedding-guestbook";

function loadEntries(): GuestEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GuestEntry[]) : [];
  } catch {
    return [];
  }
}

function HeartBurst({ burst }: { burst: number }) {
  const hearts = ["💖", "🥰", "👏", "💛", "✨", "🥳"];
  return (
    <div className="pointer-events-none absolute bottom-1/2 left-1/2 -z-10">
      {hearts.map((h, i) => {
        const angle = (i / hearts.length) * Math.PI * 2;
        const distance = 70 + (i % 3) * 28;
        return (
          <motion.span
            key={`${i}-${burst}`}
            className="absolute text-2xl"
            initial={{ x: -14, y: 8, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance - 40,
              opacity: 0,
              rotate: Math.sin(angle) * 120,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {h}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestEntry[]>(loadEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("أدخل اسمك وكلمة التهنئة أولًا");
      return;
    }
    setEntries((prev) => [
      { id: crypto.randomUUID(), name: name.trim(), message: message.trim(), date: Date.now() },
      ...prev,
    ]);
    setBurstKey(Date.now());
    toast.success("تمت إضافة تهنئتكم 🎉 شكرًا لمشاركتكم الفرحة");
    setName("");
    setMessage("");
  };

  return (
    <section id="guestbook" className="relative container-sm py-24 ">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="كلماتكم تسعدنا"
        title="صندوق التهنئة"
        subtitle="اتركوا أجمل كلماتكم وتمنياتكم للخطيبين"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* الفورم */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="border-gold/30 p-6">
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                {burstKey ? <HeartBurst key={burstKey} burst={burstKey} /> : null}
                <div className="space-y-2">
                  <Label htmlFor="guest-name">اسمك</Label>
                  <Input
                    id="guest-name"
                    placeholder="الاسم الكريم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-message">التهنئة</Label>
                  <Textarea
                    id="guest-message"
                    rows={4}
                    placeholder="كل عام وأنتم بخير، تقبّل الله..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button variant="gold" className="w-full gap-2 font-bold">
                  <Sparkles className="h-4 w-4" />
                  أضف تهنئتك
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>

        {/* القائمة */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-3"
        >
          {entries.length === 0 ? (
            <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-gold/40 bg-white/50 p-8 text-center">
              <span className="text-4xl">🕊️</span>
              <p className="mt-3 font-semibold text-muted-foreground">
                كن أول من يترك كلمة جميلة للخطيبين
              </p>
            </div>
          ) : (
            <div className="max-h-[30rem] space-y-3 overflow-y-auto pe-1">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: -14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-blush bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-bold text-wine">{entry.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                      {entry.message}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}