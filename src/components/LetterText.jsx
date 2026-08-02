/**
 * Renders letter paragraph text with optional <em> markup for asides.
 * Only supports <em> tags — no other HTML is interpreted.
 */
export default function LetterText({ text }) {
  const parts = text.split(/(<em>[\s\S]*?<\/em>)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("<em>") && part.endsWith("</em>")) {
          return <em key={i}>{part.slice(4, -5)}</em>;
        }
        return part;
      })}
    </>
  );
}
