import Reveal from "./Reveal";

import PhotoFrame from "./PhotoFrame";

import HandwrittenNote from "./HandwrittenNote";
import LetterText from "./LetterText";



/**

 * Opening page — formatted like the beginning of a real letter.

 * Presentation only; all paragraph text comes from content unchanged.

 */

export default function IntroSection({ section, herName, letterDate, layout }) {

  const hasImage = Boolean(section.image);

  const hasNote = Boolean(section.note);

  const photoPlacement = layout?.photo ?? "float-right";



  return (

    <section className="letter-section letter-section--intro">

      <div className="letter-section__inner">

        <div className="letter-section__body">

          {hasImage && photoPlacement !== "inline" && (

            <Reveal

              delay={0.12}

              className={`letter-section__media letter-section__media--${photoPlacement}`}

            >

              <PhotoFrame

                src={section.image}

                alt={section.imageAlt || section.title}

                index={0}

                caption={section.imageAlt}

                tape={layout?.photoTape}

                objectPosition={section.imagePosition}

              />

            </Reveal>

          )}



          <div className="letter-section__content">

            <header className="letter-intro__header">

              {letterDate && (

                <p className="letter-intro__date" aria-hidden="true">

                  {letterDate}

                </p>

              )}



              {section.kicker && (

                <Reveal>

                  <p className="letter-section__kicker">{section.kicker}</p>

                </Reveal>

              )}



              <Reveal delay={0.04}>

                <h2 className="letter-section__title letter-intro__title">

                  {section.title}

                </h2>

              </Reveal>



              <Reveal delay={0.08}>

                <p className="letter-intro__greeting">Dear {herName},</p>

              </Reveal>

            </header>



            <div className="letter-intro__body-start">

              {section.paragraphs?.map((paragraph, i) => (

                <Reveal key={i} delay={0.14 + i * 0.04}>

                  <p

                    className={`letter-section__paragraph${

                      i === 0 ? " letter-intro__first-paragraph" : ""

                    }`}

                  >

                    <LetterText text={paragraph} />

                  </p>

                </Reveal>

              ))}



              {hasNote && (

                <Reveal delay={0.22}>

                  <HandwrittenNote margin>{section.note}</HandwrittenNote>

                </Reveal>

              )}

            </div>

          </div>



          {hasImage && photoPlacement === "inline" && (

            <Reveal

              delay={0.12}

              className="letter-section__media letter-section__media--inline"

            >

              <PhotoFrame

                src={section.image}

                alt={section.imageAlt || section.title}

                index={0}

                caption={section.imageAlt}

                tape={layout?.photoTape}

                objectPosition={section.imagePosition}

              />

            </Reveal>

          )}

        </div>

      </div>

    </section>

  );

}

