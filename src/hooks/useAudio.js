import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "skol-birthday-audio";

/**
 * Manages the optional background music.
 *
 * - Never autoplays — playback only starts when the visitor presses play.
 * - Persists the "was playing" state so a refresh can restore it,
 *   but only resumes if the visitor had already chosen to play.
 * - Returns `available: false` when no track is configured, so the
 *   player can hide itself gracefully.
 */
export function useAudio(trackSrc) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available] = useState(Boolean(trackSrc));

  // Create the audio element once.
  useEffect(() => {
    if (!trackSrc) return;
    const audio = new Audio(trackSrc);
    audio.loop = true;
    audio.preload = "none";
    audioRef.current = audio;

    const onEnded = () => setPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [trackSrc]);

  // Restore "was playing" state after mount (user-initiated only).
  useEffect(() => {
    if (!trackSrc) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "playing") {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch(() => setPlaying(false));
          setPlaying(true);
        }
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackSrc]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      try {
        localStorage.setItem(STORAGE_KEY, "paused");
      } catch {
        /* ignore */
      }
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
      try {
        localStorage.setItem(STORAGE_KEY, "playing");
      } catch {
        /* ignore */
      }
    }
  };

  return { playing, toggle, available };
}