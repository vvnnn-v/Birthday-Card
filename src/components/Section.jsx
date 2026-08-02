import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import HandwrittenNote from "./HandwrittenNote";
import MemoryDrawer from "./MemoryDrawer";

/**
 * The single reusable section component.
 * Renders any letter section from content/letter.ts — fully
 * data-driven. Supports optional photos, handwritten notes,
 * alternating layouts, and the notebook memory drawer.
 */
export default function Section({ section, index }) {
  const alternate = index % 2 === 1;
  const hasImage = Boolean(section.image);
  const hasNote = Boolean(section.note);
  const hasMemories = Boolean(section.memories?.length);

  return (
    <section
      className={`letter-section letter-section--${section.type || "letter"} ${
        alternate ? "letter-section--alt" : ""
      }`}
    >
      <div className="letter-section__inner">
        <div className="letter-section__content">
          {section.kicker && (
            <Reveal>
              <p className="letter-section__kicker">{section.kicker}</p>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h2 className="letter-section__title">{section.title}</h2>
          </Reveal>

          {section.paragraphs?.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className="letter-section__paragraph">{paragraph}</p>
            </Reveal>
          ))}

          {hasMemories && (
            <Reveal delay={0.15}>
              <MemoryDrawer memories={section.memories} />
            </Reveal>
          )}

          {hasNote && (
            <Reveal delay={0.2}>
              <HandwrittenNote>{section.note}</HandwrittenNote>
            </Reveal>
          )}
        </div>

        {hasImage && (
          <Reveal delay={0.15} className="letter-section__media">
            <PhotoFrame
              src={section.image}
              alt={section.imageAlt || section.title}
              index={index}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
