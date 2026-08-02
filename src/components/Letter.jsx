import Section from "./Section";
import IntroSection from "./IntroSection";
import Ending from "./Ending";
import PageSticker from "./PageSticker";
import { getPageLayout } from "../config/pageDecorations";

/**
 * A single sheet of premium stationery with subtle page personality.
 */
export default function Letter({
  section,
  index,
  total,
  yourName,
  herName,
  letterDate,
  closingNote,
}) {
  const placement = [
    { x: 2, y: -1, r: 0.25 },
    { x: -3, y: 2, r: -0.3 },
    { x: 3, y: 1, r: 0.2 },
    { x: -2, y: -2, r: -0.22 },
  ][index % 4];

  const layout = getPageLayout(index);
  const isIntro = index === 0 && section.id === "intro";
  const isEnding = section.type === "ending";

  return (
    <article
      className="letter-sheet"
      style={{
        "--paper-x": `${placement.x}px`,
        "--paper-y": `${placement.y}px`,
        "--paper-tilt": `${placement.r}deg`,
      }}
    >
      <span className="letter-sheet__marker" aria-hidden="true">
        {index + 1} of {total}
      </span>
      <span className="letter-sheet__page-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      {layout.stickers?.map((sticker) => (
        <PageSticker key={`${sticker.id}-${sticker.position}`} {...sticker} />
      ))}

      {isEnding ? (
        <Ending
          section={section}
          yourName={yourName}
          closingNote={closingNote}
          layout={layout}
        />
      ) : isIntro ? (
        <IntroSection
          section={section}
          herName={herName}
          letterDate={letterDate}
          layout={layout}
        />
      ) : (
        <Section section={section} index={index} layout={layout} />
      )}
    </article>
  );
}
