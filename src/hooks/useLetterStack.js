import { useEffect, useState } from "react";

const STORAGE_KEY = "skol-birthday-progress";

/**
 * Manages the two-stack letter reading experience.
 *
 * - currentIndex: index of the letter being read (top of the unread stack)
 * - readCount: how many letters have been moved to the read stack
 * - next(): moves the current letter onto the read stack, advances
 * - prev(): brings the most recently read letter back to the top
 * - isComplete: true when every letter has been read
 */
export function useLetterStack(sectionCount) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const isComplete = readCount >= sectionCount && sectionCount > 0;

  // Always start fresh — clear any legacy saved progress.
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const next = () => {
    if (readCount >= sectionCount) return;
    // The read position always advances; the current letter may stay in
    // view on the final letter so the completion moment can land.
    setReadCount(Math.min(readCount + 1, sectionCount));
    setCurrentIndex(Math.min(currentIndex + 1, sectionCount - 1));
  };

  const prev = () => {
    if (readCount <= 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setReadCount(prevIndex);
  };

  const goTo = (index) => {
    const safe = Math.max(0, Math.min(index, sectionCount - 1));
    setCurrentIndex(safe);
    setReadCount(safe);
  };

  const reset = () => {
    setCurrentIndex(0);
    setReadCount(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  };

  const hasRead = (index) => index < readCount;
  const isCurrent = (index) => index === currentIndex;
  const isUnread = (index) => index >= readCount;

  return {
    currentIndex,
    readCount,
    next,
    prev,
    goTo,
    reset,
    hasRead,
    isCurrent,
    isUnread,
    isComplete,
  };
}
