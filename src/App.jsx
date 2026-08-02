import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections } from "../content/letter";
import { site } from "../content/site";
import Envelope from "./components/Envelope";
import Letter from "./components/Letter";
import MusicPlayer from "./components/MusicPlayer";
import { useLetterStack } from "./hooks/useLetterStack";

/**
 * The two-stack letter experience.
 *
 * The reader works through a physical stack of letters:
 *  - the active letter is always the visual focus (center, readable)
 *  - the unread stack sits on the left, subtly visible
 *  - the read stack sits on the right, growing as letters are read
 *  - when all letters are read, the stack returns to the envelope
 *
 * Everything is data-driven from content/letter.ts — the UI never
 * needs to change when content changes.
 */

// Deterministic "hand-placed" offsets so no letter sits perfectly alike.
const activeOffsets = [
  { x: 8, y: -6, r: 0.5 },
  { x: -10, y: 4, r: -0.6 },
  { x: 6, y: 8, r: 0.4 },
  { x: -7, y: -4, r: -0.45 },
  { x: 12, y: 6, r: 0.65 },
  { x: -5, y: 9, r: -0.35 },
  { x: 9, y: -8, r: 0.55 },
  { x: -11, y: 3, r: -0.7 },
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [returned, setReturned] = useState(false);
  const {
    currentIndex,
    readCount,
    restored,
    next,
    prev,
    isComplete,
  } = useLetterStack(sections.length);

  // Keyboard navigation — intentional, no autoplay.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, readCount]);

  // Show the envelope on first visit, or after reading all letters
  // (the closure moment). When returning mid-way on a refresh,
  // skip straight back to the letter.
  const showEnvelope = !opened && (!restored || returned);

  // Once all letters are read, pause, then return the stack to the envelope.
  useEffect(() => {
    if (isComplete && !returned) {
      const t = setTimeout(() => {
        setReturned(true);
        setOpened(false);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [isComplete, returned]);

  const activeSection = sections[currentIndex];
  const unreadLetters = sections.filter(
    (_, i) => i >= readCount && i !== currentIndex
  );
  const readLetters = sections.slice(0, currentIndex);

  const getActiveStyle = (index) => {
    const o = activeOffsets[index % activeOffsets.length];
    return { x: o.x, y: o.y, rotate: o.r };
  };

  return (
    <div className="app">
      {showEnvelope && (
        <Envelope
          herName={site.herName}
          label={site.envelopeLabel}
          onOpen={() => setOpened(true)}
        />
      )}

      <AnimatePresence>
        {opened && (
        <motion.main
          className="letter"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Unread stack — left, subtle */}
          <div className="letter-stack letter-stack--unread" aria-hidden="true">
            {unreadLetters.map((section, i) => (
              <motion.div
                key={section.id}
                className="letter-stack__peek"
                layout
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: 0.35 - i * 0.06,
                  y: i * 6,
                  rotate: (i % 2 === 0 ? 1 : -1) * (0.6 + i * 0.1),
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          {/* Read stack — right, growing */}
          <div className="letter-stack letter-stack--read" aria-hidden="true">
            {readLetters.map((section, i) => (
              <motion.div
                key={section.id}
                className="letter-stack__peek"
                layout
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: 0.3 - i * 0.05,
                  y: i * 5,
                  rotate: (i % 2 === 0 ? -1 : 1) * (0.5 + i * 0.1),
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          {/* The active letter — the visual focus */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              className="letter-stage"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: getActiveStyle(currentIndex).x,
                rotate: getActiveStyle(currentIndex).r,
              }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Letter
                section={activeSection}
                index={currentIndex}
                total={sections.length}
                yourName={site.yourName}
                closingNote={site.closingNote}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="letter-nav">
            <button
              type="button"
              className="letter-nav__button"
              onClick={prev}
              disabled={readCount === 0}
            >
              ← Previous
            </button>
            <span className="letter-nav__counter">
              {currentIndex + 1} / {sections.length}
            </span>
            <button
              type="button"
              className="letter-nav__button letter-nav__button--primary"
              onClick={next}
              disabled={isComplete}
            >
              {isComplete ? "All read" : "Read Next →"}
            </button>
          </div>
        </motion.main>
        )}
      </AnimatePresence>

      {returned && (
        <div className="letter-returned">
          <p className="letter-returned__text">
            All letters read. Back in the envelope, until you open it again.
          </p>
        </div>
      )}

      {opened && (
        <MusicPlayer track={site.musicTrack} label={site.musicLabel} />
      )}
    </div>
  );
}