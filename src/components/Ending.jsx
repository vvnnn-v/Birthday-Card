import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";

/**
 * The closing section.
 * Shows the final paragraphs, then "I love you." — and after a
 * brief pause, an optional handwritten P.S. note fades in at the
 * bottom-right. The note only renders if `closingNote` has content.
 */
export default function Ending({ section, yourName, closingNote }) {
  const [showLove, setShowLove] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const loveTimer = setTimeout(() => setShowLove(true), 1200);
    return () => clearTimeout(loveTimer);
  }, []);

  useEffect(() => {
    if (!closingNote) return;
    const noteTimer = setTimeout(() => setShowNote(true), 4200);
    return () => clearTimeout(noteTimer);
  }, [closingNote]);

  return (
    <section className="letter-section letter-section--ending">
      <div className="letter-section__inner letter-section__inner--ending">
        <div className="letter-section__content">
          {section.kicker && (
            <Reveal>
              <p className="letter-section__kicker">{section.kicker}</p>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h2 className="letter-section__title">{section.title}</h2>
          </Reveal>

          {section.paragraphs?.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className="letter-section__paragraph">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="letter-section__signature">— {yourName}</p>
          </Reveal>

          <AnimatePresence>
            {showLove && (
              <motion.p
                className="letter-section__love"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                I love you.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {section.image && (
          <Reveal delay={0.15} className="letter-section__media">
            <PhotoFrame
              src={section.image}
              alt={section.imageAlt || section.title}
            />
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {showNote && closingNote && (
          <motion.aside
            className="closing-note"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="closing-note__text">{closingNote}</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}