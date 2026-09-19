import { motion } from "framer-motion";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import FloatingArtifacts from "@/components/atoms/FloatingArtifacts";
import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import Gallery from "@/components/organisms/Gallery";
import Venue from "@/components/organisms/Venue";
import Program from "@/components/organisms/Program";
import CountdownSection from "@/components/organisms/CountdownSection";
import Rsvp from "@/components/organisms/Rsvp";
import Guestbook from "@/components/organisms/Guestbook";
import Footer from "@/components/organisms/Footer";
import MusicPlayer from "@/components/organisms/MusicPlayer";

interface HomeTemplateProps {
  entered: boolean;
}

/**
 * القالب الرئيسي: يجمَع الكائنات (organisms) مع الفلاتر المتحركة.
 */
export default function HomeTemplate({ entered }: HomeTemplateProps) {
  useSmoothScroll(entered);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: entered ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative min-h-screen w-full max-w-full overflow-x-hidden"
    >
      <FloatingArtifacts enabled={entered} />
      <Navbar />
      <Hero />
      <Gallery />
      <Venue />
      <Program />
      <CountdownSection />
      <Rsvp />
      <Guestbook />
      <Footer />
      <MusicPlayer />
    </motion.main>
  );
}