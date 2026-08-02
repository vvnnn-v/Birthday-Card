import { motion } from "framer-motion";

/**
 * Gentle reveal — content fades up after the page settles.
 * Extremely subtle, never distracting from the writing.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
