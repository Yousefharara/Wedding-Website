# دعوة خطوبة — عمر & جنا 💗

موقع دعوة خطوبة تفاعلي بواجهة عربية RTL مبني بـ **Atomic Design Pattern** مع سلسلة
اشترك من الانيميشن.

## المحتوى

1. **افتتاحية متسلسلة** (`IntroSequence`)
   - بطاقة خطوبة بملء الشاشة تُفتح كبطاقة بريد (طيّ 3D) بثيم زهرية وذهبية.
   - بعدها باب كامل يفتح من الجانبين ليكشف صالة الحفل مع Zoom-in تصاعدي ثم يتلاشى.
2. **طبقة عائمة** (`FloatingArtifacts`) — قلوب ❤️ وزخارف تظهر وتختفي من كل الجوانب.
3. **Hero** — آية سورة الروم (21) بخط أميري + أسماء العروسين بخط الرقعة + صورة بإطار ذهبي.
4. **معرض الصور** — منزلق (Embla Carousel).
5. **مكان الحفل** — بطاقة عنوان + زر فتح في خرائط جوجل + نسخ العنوان.
6. **برنامج الأمسية** — Timeline زمني.
7. **العدّاد التنازلي** — انقلاب أرقام بأسلوب Flip Clock مع زر إضافة للتقويم.
8. **تأكيد الحضور (RSVP)** — فورم يُرسل فعليًا إلى بريدك عبر **EmailJS**.
9. **صندوق التهنئة** — رسائل الزوار محفوظة محليًا مع انفجار قلوب.
10. **حمامة بيضاء** 🕊️ ترفرف عبر الشاشة (DoveLayer).
11. **مشغّل موسيقى** عائم يتشغّل بعد أول ضغطة.

## التقنيات

React 19 · Vite · TypeScript · Tailwind CSS v4 · framer-motion · Lenis ·
shadcn/ui · Embla Carousel · react-hook-form + yup · EmailJS

## التشغيل

```bash
npm install
npm run dev
```

## إعداد إرسال تأكيد الحضور عبر EmailJS (خطوة مهمة)

1. أنشئ حسابًا مجانيًا على https://www.emailjs.com
2. أضف خدمة بريد (Email Service) — مثل Gmail — لتحصل على **Service ID**.
3. أنشئ قالب بريد (Email Template) يحتوي متغيرات:
   `{{to_name}}` · `{{from_name}}` · `{{phone}}` · `{{attendance}}` ·
   `{{guests}}` · `{{message}}` · `{{wedding_date}}`
4. خذ **Public Key** من صفحة Account.
5. انسخ `.env.example` إلى `.env` واملأ المفاتيح:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

بعدها كل تأكيد حضور يصل إلى بريدك مباشرة.

## بيانات قابلة للتعديل

كل تفاصيل الموقع (الأسماء، التاريخ، المكان، الصور، الروابط، مفاتيح البريد، الأغنية)
توجد في ملف واحد:

```
src/constants/site.ts
```

## خريطة المكونات (Atomic Design)

```
src/
  components/
    ui/          ← atoms: buttons, inputs, radios, cards (shadcn)
    atoms/       ← SectionTitle, OrnamentDivider, FloatingArtifacts
    molecules/   ← FlipUnit, CountdownCounter
    organisms/   ← Navbar, Hero, Venue, Gallery, Program, CountdownSection,
                   Rsvp, Guestbook, Footer, MusicPlaye,
                   intro/{IntroSequence, WeddingCard, Door}
    templates/   ← HomeTemplate
  constants/     ← site.ts (كل بيانات الموقع)
  hooks/         ← useCountdown, useSmoothScroll
```