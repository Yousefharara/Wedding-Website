import emailjs from "@emailjs/browser";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Loader2, Send, PartyPopper, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";

import { SITE_CONFIG } from "@/constants/site";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrnamentDivider from "@/components/atoms/OrnamentDivider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RsvpFormValues {
  name: string;
  phone: string;
  attendance: "yes" | "no";
  guests?: number;
  message?: string;
}

const schema = yup.object({
  name: yup.string().required("المرجو إدخال الاسم"),
  phone: yup
    .string()
    .required("المرجو إدخال رقم الهاتف")
    .matches(/^[0-9+\s-]{7,}$/, "رقم هاتف غير صحيح"),
  attendance: yup.string().oneOf(["yes", "no"]).required("حدّد موقفك من الحضور"),
  guests: yup.number().min(1).max(8),
  message: yup.string().max(500, "الرسالة طويلة جدًا"),
});

const resolver = yupResolver(schema) as unknown as Resolver<RsvpFormValues>;

const defaultValues: RsvpFormValues = {
  name: "",
  phone: "",
  attendance: "yes",
  guests: 1,
  message: "",
};

export default function Rsvp() {
  const { couple, dateLabel, timeLabel, emailjs: emailjsConfig, socials } = SITE_CONFIG;

  const { register, handleSubmit, control, setValue, formState, reset } =
    useForm<RsvpFormValues>({
      resolver,
      defaultValues,
    });

  const attendance = useWatch({ control, name: "attendance" });
  const guests = useWatch({ control, name: "guests" });
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: RsvpFormValues) => {
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      toast.error("لم يكتمل إعداد الربط البريدي بعد. أضف مفاتيح EmailJS في ملف .env");
      return;
    }

    try {
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          to_name: `${couple.groom} و ${couple.bride}`,
          from_name: data.name,
          phone: data.phone,
          attendance:
            data.attendance === "yes" ? "نعم سأحضر 💖" : "للأسف لن أستطيع الحضور",
          guests: data.guests,
          message: data.message || "لا توجد رسالة",
          wedding_date: `${dateLabel} — ${timeLabel}`,
          reply_to: "",
        },
        { publicKey: emailjsConfig.publicKey },
      );

      if (result.status === 200) {
        toast.success("تم إرسال تأكيد حضوركم بنجاح 💌 يسعدنا رؤيتكم!", {
          icon: <PartyPopper className="h-5 w-5 text-gold-dark" />,
        });
        reset();
      }
    } catch {
      toast.error("تعذّر الإرسال، فضلاً أعد المحاولة أو راسلنا عبر واتساب");
    }
  };

  const whatsappMessage = encodeURIComponent(
    `مرحبًا ${couple.groom} و ${couple.bride} 💛 أنا أعذر عن الحضور يوم ${dateLabel} وأرسل تهنئتي لكم.`,
  );

  return (
    <section id="rsvp" className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <OrnamentDivider className="mb-8" />
      <SectionTitle
        eyebrow="نقترب من اللحظة"
        title="تأكيد الحضور"
        subtitle="أخبرونا إن كنتم ستنضمون إلى فرحتنا، واتركوا كلمة لعريسنا"
      />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mt-12"
      >
        <Card className="border-gold/30 p-7 sm:p-9">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* الاسم */}
            <div className="space-y-2">
              <Label htmlFor="rsvp-name">الاسم الكامل</Label>
              <Input
                id="rsvp-name"
                placeholder="اكتب اسمك الكريم"
                {...register("name")}
              />
              {formState.errors.name ? (
                <p className="text-xs font-semibold text-destructive">
                  {formState.errors.name.message}
                </p>
              ) : null}
            </div>

            {/* الهاتف */}
            <div className="space-y-2">
              <Label htmlFor="rsvp-phone">رقم الهاتف</Label>
              <Input
                id="rsvp-phone"
                type="tel"
                dir="ltr"
                placeholder="+20 1XX XXX XXXX"
                className="text-left"
                {...register("phone")}
              />
              {formState.errors.phone ? (
                <p className="text-xs font-semibold text-destructive">
                  {formState.errors.phone.message}
                </p>
              ) : null}
            </div>

            {/* الحضور */}
            <div className="space-y-2">
              <Label>هل ستشرفنا بحضورك؟</Label>
              <RadioGroup
                value={attendance}
                onValueChange={(value) =>
                  setValue("attendance", value as "yes" | "no", { shouldDirty: true })
                }
                className="grid grid-cols-2 gap-3"
              >
                {(
                  [
                    { value: "yes", label: "حاضر 💖" },
                    { value: "no", label: "معتذر 💔" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 p-4 font-bold transition-all",
                      attendance === option.value
                        ? "border-primary bg-blush/70 text-primary shadow-sm"
                        : "border-input bg-white/60 text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    <RadioGroupItem value={option.value} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </RadioGroup>
              {formState.errors.attendance ? (
                <p className="text-xs font-semibold text-destructive">
                  {formState.errors.attendance.message}
                </p>
              ) : null}
            </div>

            {/* عدد الحضور */}
            {attendance === "yes" ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <Label>عدد الحضور</Label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setValue("guests", n, { shouldDirty: true })
                      }
                      className={cn(
                        "h-11 w-11 rounded-full border-2 text-sm font-bold transition-all",
                        guests === n
                          ? "border-primary bg-gradient-to-br from-primary to-[#b34d79] text-white shadow-md"
                          : "border-input bg-white/60 text-muted-foreground hover:border-primary/50",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* الرسالة */}
            <div className="space-y-2">
              <Label htmlFor="rsvp-message">كلمة للعروس والعريس</Label>
              <Textarea
                id="rsvp-message"
                rows={4}
                placeholder="اكتب تهنئتك أو رسالتك الخاصة..."
                {...register("message")}
              />
              {formState.errors.message ? (
                <p className="text-xs font-semibold text-destructive">
                  {formState.errors.message.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-center gap-3 pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isSubmitting}
                className="w-full gap-2 sm:w-auto"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                {isSubmitting ? "جارٍ الإرسال..." : "إرسال التأكيد"}
              </Button>

              <p className="text-xs text-muted-foreground">
                تُرسل استجابتك مباشرة إلى {couple.groom} و {couple.bride} عبر البريد
                الإلكتروني
              </p>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2 text-sm font-semibold"
              >
                <a
                  href={`https://wa.me/${socials.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircleHeart className="h-4 w-4 text-emerald-600" />
                  أو أرسل عبر واتساب
                </a>
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </section>
  );
}