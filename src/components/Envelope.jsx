import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The opening scene: a cream envelope with a wax seal.
 * Clicking it lifts the flap and the letter rises out,
 * then the reading experience begins.
 */
export default function Envelope({ herName, label, onOpen }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    // Let the letter rise before handing over to the reader.
    setTimeout(onOpen, 1600);
  };

  return (
    <motion.section
      className="envelope-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <AnimatePresence>
        {!opened ? (
          <motion.button
            type="button"
            className="envelope"
            onClick={handleOpen}
            aria-label="Open the letter"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <span className="envelope__flap" aria-hidden="true" />
            <span className="envelope__body" aria-hidden="true" />
            <span className="envelope__seal" aria-hidden="true">
              <span className="envelope__seal-heart">♥</span>
            </span>
            <span className="envelope__label">
              {label || "for you"}
            </span>
            <span className="envelope__hint">tap to open</span>
          </motion.button>
        ) : (
          <motion.div
            className="envelope-letter"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="envelope-letter__greeting">Dear {herName},</p>
            <p className="envelope-letter__line">
              I wrote you something. Take your time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}