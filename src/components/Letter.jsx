import Section from "./Section";
import Ending from "./Ending";

/**
 * A single handwritten letter sheet.
 * Rendered inside the two-stack experience. Designed to feel like
 * a real sheet of paper on a desk — never perfectly aligned.
 */
export default function Letter({
  section,
  index,
  total,
  yourName,
  closingNote,
}) {
  const placement = [
    { x: 3, y: -2, r: 0.35, shadow: 0.11 },
    { x: -5, y: 3, r: -0.45, shadow: 0.14 },
    { x: 4, y: 2, r: 0.28, shadow: 0.1 },
    { x: -3, y: -3, r: -0.3, shadow: 0.13 },
  ][index % 4];

  return (
    <article
      className="letter-sheet"
      style={{
        "--paper-x": `${placement.x}px`,
        "--paper-y": `${placement.y}px`,
        "--paper-tilt": `${placement.r}deg`,
        "--paper-shadow": placement.shadow,
      }}
    >
      <span className="letter-sheet__marker" aria-hidden="true">
        letter {index + 1} of {total}
      </span>
      <span className="letter-sheet__page-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="letter-sheet__ink-smudge" aria-hidden="true" />
      {index === 0 && <span className="letter-sheet__frog" aria-hidden="true">♧</span>}
      {index === 2 && <span className="letter-sheet__sticky" aria-hidden="true">♥</span>}
      {section.type === "ending" ? (
        <Ending
          section={section}
          yourName={yourName}
          closingNote={closingNote}
        />
      ) : (
        <Section section={section} index={index} />
      )}
    </article>
  );
}
