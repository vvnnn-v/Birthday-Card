import { motion } from "framer-motion";

import { stickerAssets } from "../config/pageDecorations";



/**

 * A small decorative sticker placed in the page margins.

 * Never covers text — purely visual discovery.

 */

export default function PageSticker({ id, position, size = 44, rotate = 0 }) {

  const src = stickerAssets[id];

  if (!src) return null;



  const isMid = position.startsWith("mid-");



  return (

    <motion.img

      className={`page-sticker page-sticker--${position}`}

      src={src}

      alt=""

      aria-hidden="true"

      initial={{ opacity: 0, scale: 0.92 }}

      animate={{ opacity: 1, scale: 1 }}

      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}

      style={{

        width: `${size}px`,

        height: `${size}px`,

        transform: isMid

          ? `translateY(-50%) rotate(${rotate}deg)`

          : `rotate(${rotate}deg)`,

      }}

    />

  );

}

