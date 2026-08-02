import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** A single physical envelope: its letter stays inside the assembly while opening. */
export default function Envelope({ herName, label, onOpen }) {
  const [opened, setOpened] = useState(false);
  const openTimer = useRef(null);

  useEffect(() => () => clearTimeout(openTimer.current), []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    openTimer.current = setTimeout(onOpen, 1800);
  };

  return (
    <motion.section className="envelope-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
      <motion.button
        type="button"
        className={`envelope ${opened ? "envelope--opened" : ""}`}
        onClick={handleOpen}
        aria-label={opened ? "Opening the letter" : "Open the letter"}
        disabled={opened}
      >
        <motion.div
          className="envelope-letter"
          initial={false}
          animate={{ y: opened ? -154 : 0, opacity: opened ? 1 : 0 }}
          transition={{ duration: 1.25, delay: opened ? 0.24 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="envelope-letter__greeting">Dear {herName},</p>
          <p className="envelope-letter__line">I wrote you something. Take your time.</p>
        </motion.div>
        <motion.span
          className="envelope__flap"
          aria-hidden="true"
          initial={false}
          animate={{ rotateX: opened ? -168 : 0 }}
          transition={{ duration: 0.95, ease: [0.32, 0, 0.15, 1] }}
        />
        <span className="envelope__body" aria-hidden="true" />
        <motion.span className="envelope__label" animate={{ opacity: opened ? 0 : 1 }}>{label || "for you"}</motion.span>
        <motion.span className="envelope__hint" animate={{ opacity: opened ? 0 : 1 }}>tap to open</motion.span>
      </motion.button>
    </motion.section>
  );
}
