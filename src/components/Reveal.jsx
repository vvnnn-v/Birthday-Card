import { motion } from "framer-motion";

/**
 * Reusable reveal wrapper — the only animation in the reading flow.
 * Mount-based (no scroll dependency): content fades up gently after
 * the letter settles into place. Extremely subtle.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}