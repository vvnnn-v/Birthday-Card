/**
 * A handwritten margin note, set in Caveat.
 * Used sparingly — only a few across the whole letter.
 */
export default function HandwrittenNote({ children, margin = false }) {
  return (
    <aside
      className={`handwritten-note${margin ? " handwritten-note--margin" : ""}`}
      aria-label="a handwritten note"
    >
      <p className="handwritten-note__text">{children}</p>
    </aside>
  );
}
