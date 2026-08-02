/**
 * ─────────────────────────────────────────────────────────────
 *  THE LETTER
 *  This is the heart of the website. Every section below is
 *  rendered automatically — the UI never needs to change.
 *
 *  To edit the letter:
 *    • Replace the bracketed [placeholder] text with your words.
 *    • Add / remove / reorder sections freely.
 *    • Drop real photos into public/assets/photos/ using the
 *      exact filenames referenced in `image`.
 * ─────────────────────────────────────────────────────────────
 */

export interface MemoryItem {
  /** Short title shown in the notebook list. */
  title: string;
  /** Longer description revealed when the item is opened. */
  description: string;
}

export interface LetterSection {
  /** Unique id — used for scroll tracking. */
  id: string;

  /** Small label above the title, e.g. "One". */
  kicker?: string;

  /** The section heading. */
  title: string;

  /** Body paragraphs. Omit for sections that use `memories`. */
  paragraphs?: string[];

  /** Optional handwritten margin note (use sparingly). */
  note?: string;

  /** Optional photo path under public/assets/photos/. */
  image?: string;

  /** Alt text for the photo. */
  imageAlt?: string;

  /** Optional list of memories — renders the notebook drawer. */
  memories?: MemoryItem[];

  /** "ending" renders the special closing layout. */
  type?: "letter" | "ending";
}

export const sections: LetterSection[] = [
  {
    id: "intro",
    kicker: "First, a letter",
    title: "Intro Letter",
    paragraphs: [
      `[Write the opening of your letter here — the first words you want her to read.]`,
      `[Continue the introduction — set the tone, slow and warm.]`,
    ],
    note: `[a small handwritten thought…]`,
    image: "/assets/photos/01-intro.jpg",
    imageAlt: "A memory that belongs to us",
  },
  {
    id: "warmth",
    kicker: "One",
    title: "The First Thing I Noticed",
    paragraphs: [
      `[Write about the first thing you noticed about her.]`,
      `[Add another paragraph if you'd like — or remove it.]`,
    ],
    image: "/assets/photos/02-warmth.jpg",
    imageAlt: "The first thing I noticed",
  },
  {
    id: "little-things",
    kicker: "Two",
    title: "The Little Things I Don't Think You Realize",
    paragraphs: [
      `[Write about the small, quiet things she does that she probably doesn't notice.]`,
      `[Another paragraph, if it feels right.]`,
    ],
    note: `[a rare handwritten thought…]`,
    image: "/assets/photos/03-little-things.jpg",
    imageAlt: "The little things",
  },
  {
    id: "reminders",
    kicker: "Three",
    title: "Things That Remind Me Of You",
    paragraphs: [
      `[A short line introducing the memories below — or remove this paragraph entirely.]`,
    ],
    memories: [
      {
        title: "[A memory title]",
        description: `[Write what this memory is — a small story, a feeling, a moment.]`,
      },
      {
        title: "[Another memory title]",
        description: `[Write what this memory is.]`,
      },
      {
        title: "[One more memory title]",
        description: `[Write what this memory is.]`,
      },
    ],
    image: "/assets/photos/04-reminders.jpg",
    imageAlt: "Things that remind me of you",
  },
  {
    id: "changed",
    kicker: "Four",
    title: "Things You've Changed",
    paragraphs: [
      `[Write about the ways she has changed you — quietly, gently.]`,
    ],
    image: "/assets/photos/05-changed.jpg",
    imageAlt: "Things you've changed",
  },
  {
    id: "grateful",
    kicker: "Five",
    title: "What I'm Grateful For",
    paragraphs: [
      `[Write what you're grateful for — the ordinary days, the quiet moments.]`,
      `[Another paragraph, if it feels right.]`,
    ],
    note: `[a rare handwritten thought…]`,
    image: "/assets/photos/06-grateful.jpg",
    imageAlt: "What I'm grateful for",
  },
  {
    id: "perceive",
    kicker: "Six",
    title: "How I Perceive You",
    paragraphs: [
      `[Write how you see her — not just how she looks, but who she is.]`,
    ],
    image: "/assets/photos/07-perceive.jpg",
    imageAlt: "How I perceive you",
  },
  {
    id: "ending",
    type: "ending",
    kicker: "Lastly",
    title: "Ending",
    paragraphs: [
      `[Write your final words before the closing — then the ending section will show "I love you."]`,
    ],
    image: "/assets/photos/08-ending.jpg",
    imageAlt: "Us",
  },
];