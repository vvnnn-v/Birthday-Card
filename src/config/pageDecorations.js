import frog from "../assets/stickers/frog.svg";

import banana from "../assets/stickers/banana.svg";

import flower from "../assets/stickers/flower.svg";

import heart from "../assets/stickers/heart.svg";

import star from "../assets/stickers/star.svg";

import sparkle from "../assets/stickers/sparkle.svg";

import leaf from "../assets/stickers/leaf.svg";

import paperclip from "../assets/stickers/paperclip.svg";

import envelope from "../assets/stickers/envelope.svg";



/** Sticker asset registry — one consistent illustration style. */

export const stickerAssets = {

  frog,

  banana,

  flower,

  heart,

  star,

  sparkle,

  leaf,

  paperclip,

  envelope,

};



/**

 * Per-page layout and decoration config.

 * Gives each page subtle personality without changing letter content.

 *

 * photo: placement variant for the section image

 * photoTape: show washi tape holding the photograph

 * stickers: max 2 decorative touches per page

 */

export const pageLayouts = [

  // 0 — intro: letter opening, frog peeking, heart near top

  {

    photo: "float-right",

    photoTape: true,

    stickers: [

      { id: "frog", position: "bottom-right", size: 52, rotate: -8 },

      { id: "heart", position: "top-right", size: 34, rotate: 12 },

    ],

  },

  // 1 — warmth: mostly writing, one flower in margin

  {

    photo: "float-left",

    photoTape: false,

    stickers: [{ id: "flower", position: "mid-left", size: 44, rotate: -6 }],

  },

  // 2 — little things: star + taped photo

  {

    photo: "float-right",

    photoTape: true,

    stickers: [{ id: "star", position: "bottom-left", size: 40, rotate: 5 }],

  },

  // 3 — type of person: mostly writing, tiny heart

  {

    photo: "float-left",

    photoTape: false,

    stickers: [{ id: "heart", position: "bottom-right", size: 32, rotate: -4 }],

  },

  // 4 — banana beside a funny memory

  {

    photo: "float-right",

    photoTape: false,

    stickers: [{ id: "banana", position: "top-left", size: 48, rotate: -12 }],

  },

  // 5 — reminders (frogs mentioned): frog + leaf

  {

    photo: "float-left",

    photoTape: true,

    stickers: [

      { id: "frog", position: "bottom-right", size: 46, rotate: 6 },

      { id: "leaf", position: "top-right", size: 38, rotate: -10 },

    ],

  },

  // 6 — changed: mostly writing, sparkle only

  {

    photo: "inline",

    photoTape: false,

    stickers: [{ id: "sparkle", position: "top-left", size: 42, rotate: 0 }],

  },

  // 7 — grateful: flower + paperclip near heartfelt note

  {

    photo: "float-left",

    photoTape: true,

    stickers: [

      { id: "flower", position: "bottom-right", size: 40, rotate: 8 },

      { id: "paperclip", position: "top-left", size: 36, rotate: 14 },

    ],

  },

  // 8 — perceive: writing-focused, one star

  {

    photo: "float-right",

    photoTape: false,

    stickers: [{ id: "star", position: "mid-right", size: 36, rotate: -5 }],

  },

  // 9 — ending: heart near signature, tiny envelope

  {

    photo: "float-right",

    photoTape: false,

    stickers: [

      { id: "heart", position: "bottom-left", size: 38, rotate: -6 },

      { id: "envelope", position: "top-left", size: 44, rotate: -4 },

    ],

  },

];



export function getPageLayout(index) {

  return pageLayouts[index] ?? pageLayouts[0];

}

