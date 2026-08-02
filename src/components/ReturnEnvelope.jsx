import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** The quiet, physical closing gesture after the last letter. */
export default function ReturnEnvelope({ onReplay }) {
  const [phase, setPhase] = useState("gather");

  useEffect(() => {
    const insert = setTimeout(() => setPhase("insert"), 1100);
    const close = setTimeout(() => setPhase("closed"), 2300);
    const note = setTimeout(() => setPhase("note"), 3350);
    return () => [insert, close, note].forEach(clearTimeout);
  }, []);

  return (
    <section className={`return-envelope return-envelope--${phase}`} aria-label="The letters are put away">
      <motion.div className="return-envelope__warmth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      <div className="return-envelope__assembly" aria-hidden="true">
        <motion.div
          className="return-envelope__stack"
          initial={{ opacity: 0, y: -118, rotate: -1.5 }}
          animate={phase === "gather" ? { opacity: 1, y: -118, rotate: -0.35 } : { opacity: 1, y: -8, rotate: 0, scale: 0.96 }}
          transition={{ duration: phase === "gather" ? 1.05 : 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {[0, 1, 2, 3].map((sheet) => <span className="return-envelope__sheet" key={sheet} style={{ "--sheet": sheet }} />)}
        </motion.div>
        <div className="return-envelope__body" />
        <motion.div
          className="return-envelope__flap"
          initial={{ rotateX: -112 }}
          animate={{ rotateX: phase === "closed" || phase === "note" ? 0 : -112 }}
          transition={{ duration: 1.1, ease: [0.32, 0, 0.15, 1] }}
        />
        <span className="return-envelope__seal">♥</span>
      </div>

      {phase === "note" && (
        <motion.div className="return-envelope__note" initial={{ opacity: 0, y: 12, rotate: -1.2 }} animate={{ opacity: 1, y: 0, rotate: -0.4 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <p>{`This is all I could fit.\n\nI know there are still so many things I forgot to say.\nMaybe that's because no amount of words could ever fully explain what you mean to me.\n\nHappy Birthday, baby. ❤️`}</p>
          <button type="button" onClick={onReplay}>Open the envelope again</button>
        </motion.div>
      )}
    </section>
  );
}
