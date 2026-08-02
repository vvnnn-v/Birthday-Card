/**
 * A handwritten margin note, set in Caveat.
 * Used sparingly — only a few across the whole letter.
 */
export default function HandwrittenNote({ children }) {
  return (
    <aside className="handwritten-note" aria-label="a handwritten note">
      <span className="handwritten-note__mark" aria-hidden="true">
        ✳
      </span>
      <p className="handwritten-note__text">{children}</p>
    </aside>
  );
}