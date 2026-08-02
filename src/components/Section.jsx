import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import HandwrittenNote from "./HandwrittenNote";
import MemoryDrawer from "./MemoryDrawer";
import LetterText from "./LetterText";

/**
 * Renders one page of the birthday letter.
 * Layout and decorations vary per page; text is unchanged from content.
 */
export default function Section({ section, index, layout }) {
  const hasImage = Boolean(section.image);
  const hasNote = Boolean(section.note);
  const hasMemories = Boolean(section.memories?.length);
  const photoPlacement = layout?.photo ?? (index % 3 === 0 ? "float-right" : index % 3 === 1 ? "float-left" : "inline");

  const renderPhoto = () => (
    <Reveal
      delay={0.12}
      className={`letter-section__media letter-section__media--${photoPlacement}`}
    >
      <PhotoFrame
        src={section.image}
        alt={section.imageAlt || section.title}
        index={index}
        caption={section.imageAlt}
        tape={layout?.photoTape}
        objectPosition={section.imagePosition}
      />
    </Reveal>
  );

  return (
    <section className={`letter-section letter-section--${section.type || "letter"}`}>
      <div className="letter-section__inner">
        <div className="letter-section__body">
          {hasImage && photoPlacement !== "inline" && renderPhoto()}

          <div className="letter-section__content">
            {(section.kicker || section.title) && (
              <header className="letter-section__header">
                {section.kicker && (
                  <Reveal>
                    <p className="letter-section__kicker">{section.kicker}</p>
                  </Reveal>
                )}

                <Reveal delay={0.05}>
                  <h2 className="letter-section__title">{section.title}</h2>
                </Reveal>
              </header>
            )}

            {section.paragraphs?.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.04}>
                <p className="letter-section__paragraph">
                  <LetterText text={paragraph} />
                </p>
              </Reveal>
            ))}

            {hasMemories && (
              <Reveal delay={0.15}>
                <MemoryDrawer memories={section.memories} />
              </Reveal>
            )}

            {hasNote && (
              <Reveal delay={0.18}>
                <HandwrittenNote margin>{section.note}</HandwrittenNote>
              </Reveal>
            )}
          </div>

          {hasImage && photoPlacement === "inline" && renderPhoto()}
        </div>
      </div>
    </section>
  );
}
