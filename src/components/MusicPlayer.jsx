import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";

/**
 * Small, elegant music control.
 * - Never autoplays — the visitor chooses when to start.
 * - Hides itself gracefully when no track is configured.
 */
export default function MusicPlayer({ track, label }) {
  const { playing, toggle, available } = useAudio(track);

  if (!available) return null;

  return (
    <motion.div
      className="music-player"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="music-player__button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <span className="music-player__disc" aria-hidden="true">
          {playing ? (
            <span className="music-player__pause">❚❚</span>
          ) : (
            <span className="music-player__play">▶</span>
          )}
        </span>
      </button>
      {label && <span className="music-player__label">{label}</span>}
    </motion.div>
  );
}