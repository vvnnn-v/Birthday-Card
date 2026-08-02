import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Reveal from "./Reveal";

import PhotoFrame from "./PhotoFrame";
import LetterText from "./LetterText";



/** The closing page — left-aligned like the rest of the letter. */

export default function Ending({ section, yourName, closingNote, layout }) {

  const [showLove, setShowLove] = useState(false);

  const [showNote, setShowNote] = useState(false);

  const photoPlacement = layout?.photo ?? "float-right";



  useEffect(() => {

    const loveTimer = setTimeout(() => setShowLove(true), 1200);

    return () => clearTimeout(loveTimer);

  }, []);



  useEffect(() => {

    if (!closingNote) return;

    const noteTimer = setTimeout(() => setShowNote(true), 4200);

    return () => clearTimeout(noteTimer);

  }, [closingNote]);



  return (

    <section className="letter-section letter-section--ending">

      <div className="letter-section__inner">

        <div className="letter-section__body">

          {section.image && photoPlacement !== "inline" && (

            <Reveal

              delay={0.12}

              className={`letter-section__media letter-section__media--${photoPlacement}`}

            >

              <PhotoFrame

                src={section.image}

                alt={section.imageAlt || section.title}

                index={9}

                caption={section.imageAlt}

                tape={layout?.photoTape}

              />

            </Reveal>

          )}



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

              <Reveal key={i} delay={0.1 + i * 0.04}>

                <p className="letter-section__paragraph">
                  <LetterText text={paragraph} />
                </p>

              </Reveal>

            ))}



            <Reveal delay={0.2}>

              <div className="letter-section__signature-block">

                <p className="letter-section__signature">{yourName}</p>



                <AnimatePresence>

                  {showLove && (

                    <motion.p

                      className="letter-section__love"

                      initial={{ opacity: 0, y: 12 }}

                      animate={{ opacity: 1, y: 0 }}

                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}

                    >

                      I love you.

                    </motion.p>

                  )}

                </AnimatePresence>

              </div>

            </Reveal>

          </div>



          {section.image && photoPlacement === "inline" && (

            <Reveal

              delay={0.12}

              className="letter-section__media letter-section__media--inline"

            >

              <PhotoFrame

                src={section.image}

                alt={section.imageAlt || section.title}

                index={9}

                caption={section.imageAlt}

                tape={layout?.photoTape}

              />

            </Reveal>

          )}

        </div>

      </div>



      <AnimatePresence>

        {showNote && closingNote && (

          <motion.aside

            className="closing-note"

            initial={{ opacity: 0, y: 10 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}

          >

            <p className="closing-note__text">{closingNote}</p>

          </motion.aside>

        )}

      </AnimatePresence>

    </section>

  );

}

