import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** The opening gesture in reverse: letters return, then the envelope closes. */
export default function ReturnEnvelope({ onReplay }) {
  const [phase, setPhase] = useState("open");

  useEffect(() => {
    const insert = setTimeout(() => setPhase("insert"), 900);
    const close = setTimeout(() => setPhase("closed"), 2200);
    const note = setTimeout(() => setPhase("note"), 3350);
    return () => [insert, close, note].forEach(clearTimeout);
  }, []);

  const closed = phase === "closed" || phase === "note";

  return (
    <section className="return-envelope" aria-label="The letters are put away">
      <motion.div className="return-envelope__warmth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      <div className="return-envelope__assembly" aria-hidden="true">
        <motion.div
          className="return-envelope__stack"
          initial={{ y: -154, opacity: 1, rotate: -0.35 }}
          animate={{ y: phase === "open" ? -154 : 0, opacity: closed ? 0 : 1, rotate: 0 }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {[0, 1, 2, 3].map((sheet) => <span className="return-envelope__sheet" key={sheet} style={{ "--sheet": sheet }} />)}
        </motion.div>
        <div className="return-envelope__body" />
        <motion.div
          className="return-envelope__flap"
          initial={{ rotateX: -168 }}
          animate={{ rotateX: closed ? 0 : -168 }}
          transition={{ duration: 0.95, ease: [0.32, 0, 0.15, 1] }}
        />
        <motion.span className="return-envelope__seal" initial={{ opacity: 0 }} animate={{ opacity: closed ? 1 : 0 }} transition={{ duration: 0.28, delay: closed ? 0.65 : 0 }}>♥</motion.span>
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
