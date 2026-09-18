import { motion } from "framer-motion";

interface OrnamentDividerProps {
  className?: string;
}

export default function OrnamentDivider({ className = "" }: OrnamentDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-l from-gold to-transparent sm:w-24" />
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="text-gold-dark"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l2.4 6.2L21 9.5l-5.2 4.5 1.2 6.8L12 17.6l-5 3.2 1.2-6.8L3 9.5l6.6-1.3L12 2z"
            fill="currentColor"
          />
        </svg>
      </motion.span>
      <span className="h-px w-16 bg-gradient-to-r from-gold to-transparent sm:w-24" />
    </motion.div>
  );
}