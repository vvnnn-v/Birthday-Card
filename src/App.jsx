import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections } from "../content/letter";
import { site } from "../content/site";
import Envelope from "./components/Envelope";
import Letter from "./components/Letter";
import MusicPlayer from "./components/MusicPlayer";
import ReturnEnvelope from "./components/ReturnEnvelope";
import { useLetterStack } from "./hooks/useLetterStack";

/** Apply site metadata to the document once on mount. */
function useDocumentMeta() {
  useEffect(() => {
    if (site.title) document.title = site.title;
    if (site.metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = site.metaDescription;
    }
  }, []);
}

// Subtle hand-placed offsets — no two pages sit perfectly alike.
const activeOffsets = [
  { x: 4, y: -3, r: 0.3 },
  { x: -5, y: 2, r: -0.35 },
  { x: 3, y: 4, r: 0.25 },
  { x: -4, y: -2, r: -0.28 },
  { x: 6, y: 3, r: 0.4 },
  { x: -3, y: 5, r: -0.22 },
  { x: 5, y: -4, r: 0.32 },
  { x: -6, y: 2, r: -0.38 },
];

export default function App() {
  useDocumentMeta();

  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const {
    currentIndex,
    readCount,
    next,
    prev,
    isComplete,
    reset,
  } = useLetterStack(sections.length);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, readCount]);

  const showEnvelope = !opened && !closing;

  useEffect(() => {
    if (isComplete && opened && !closing) {
      const t = setTimeout(() => {
        setClosing(true);
        setOpened(false);
      }, 1250);
      return () => clearTimeout(t);
    }
  }, [isComplete, opened, closing]);

  const replay = () => {
    reset();
    setClosing(false);
    setOpened(false);
  };

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

      {opened && (
        <motion.main
          className="letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Unread stack — left, subtle */}
          <div className="letter-stack letter-stack--unread" aria-hidden="true">
            {unreadLetters.map((section, i) => (
              <motion.div
                key={section.id}
                className="letter-stack__peek"
                layout
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: 0.28 - i * 0.05,
                  y: i * 5,
                  rotate: (i % 2 === 0 ? 1 : -1) * (0.5 + i * 0.08),
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          {/* Read stack — right, growing */}
          <div className="letter-stack letter-stack--read" aria-hidden="true">
            {(isComplete ? sections : readLetters).map((section, i) => (
              <motion.div
                key={section.id}
                className="letter-stack__peek"
                layout
                initial={{ opacity: 0.25 }}
                animate={{
                  opacity: 0.25 - i * 0.04,
                  y: i * 4,
                  rotate: (i % 2 === 0 ? -1 : 1) * (0.4 + i * 0.08),
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          {/* Active page — grows naturally, not centered in viewport */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              className="letter-stage"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: isComplete ? 120 : 0,
                scale: isComplete ? 0.15 : 1,
                x: isComplete ? 280 : getActiveStyle(currentIndex).x,
                rotate: isComplete ? -1 : getActiveStyle(currentIndex).r,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: isComplete ? 0.95 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Letter
                section={activeSection}
                index={currentIndex}
                total={sections.length}
                yourName={site.yourName}
                herName={site.herName}
                letterDate={site.letterDate}
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

      {closing && <ReturnEnvelope onReplay={replay} />}

      {opened && (
        <MusicPlayer track={site.musicTrack} label={site.musicLabel} />
      )}
    </div>
  );
}
