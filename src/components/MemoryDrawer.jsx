import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Notebook-style memory drawer.
 * Clicking a memory slides a small paper card out beneath it —
 * no modals, no popups. Only one memory is open at a time.
 */
export default function MemoryDrawer({ memories }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="memory-drawer">
      {memories.map((memory, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="memory-drawer__item" key={memory.title}>
            <button
              type="button"
              className="memory-drawer__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="memory-drawer__bullet" aria-hidden="true">
                •
              </span>
              <span className="memory-drawer__title">{memory.title}</span>
              <span className="memory-drawer__chevron" aria-hidden="true">
                {isOpen ? "–" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="memory-drawer__card"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="memory-drawer__paper">
                    <p className="memory-drawer__description">
                      {memory.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}