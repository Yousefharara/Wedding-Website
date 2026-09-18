import { motion } from "framer-motion";

interface DoveProps {
  className?: string;
  size?: number;
  flip?: boolean;
}

/**
 * حمامة بيضاء طائرة (SVG) مع خفقان للأجنحة.
 */
export default function Dove({ className = "", size = 60, flip = false }: DoveProps) {
  return (
    <svg
      viewBox="0 0 128 96"
      className={className}
      width={size}
      style={{
        filter: "drop-shadow(0 6px 12px rgba(89,35,58,0.18))",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      {/* الذيل */}
      <path
        d="M24 56 C 8 50 2 42 6 32 C 12 22 22 26 34 40 Z"
        fill="#ffffff"
        stroke="#ecdde2"
        strokeWidth="1.5"
      />
      {/* الجسم */}
      <path
        d="M28 50 C 42 30 74 24 94 36 C 78 50 48 56 28 50 Z"
        fill="#ffffff"
        stroke="#ecdde2"
        strokeWidth="1.5"
      />
      {/* الرأس والرقبة */}
      <path
        d="M87 34 C 96 27 106 28 109 35 C 111 41 104 48 93 48 Z"
        fill="#ffffff"
        stroke="#ecdde2"
        strokeWidth="1.5"
      />
      {/* المنقار */}
      <path d="M108 31 L120 28 L113 36 Z" fill="#f4b942" stroke="#e0a22f" strokeWidth="1" />
      {/* العين */}
      <circle cx="102" cy="35" r="2" fill="#3c1529" />
      {/* الجناح السفلي */}
      <path
        d="M52 52 C 60 38 78 26 94 32 C 78 42 62 46 52 52 Z"
        fill="#ffffff"
        stroke="#e6cdd6"
        strokeWidth="1"
      />
      {/* الجناح العلوي المتحرك */}
      <motion.g
        style={{ transformOrigin: "60px 46px" }}
        animate={{ rotate: [-14, 26, -14] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M56 50 C 64 22 92 4 122 10 C 100 16 78 28 64 48 Z"
          fill="#ffffff"
          stroke="#ecdde2"
          strokeWidth="1.5"
        />
        <path d="M58 44 C 70 26 90 12 116 10 C 94 22 76 32 64 44 Z" fill="#fafafa" />
      </motion.g>
    </svg>
  );
}