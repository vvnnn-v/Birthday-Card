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
  return (
    <article className="letter-sheet">
      <span className="letter-sheet__marker" aria-hidden="true">
        letter {index + 1} of {total}
      </span>
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