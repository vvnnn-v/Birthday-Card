/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS
 *  This is one of the only files you should ever need to edit.
 *  Everything here is presentation-agnostic — no UI code lives
 *  in this file, and no content lives in the components.
 * ─────────────────────────────────────────────────────────────
 */

export interface SiteConfig {
  /** Her name, used in the envelope and the opening line. */
  herName: string;

  /** Your name — used for the signature at the end of the letter. */
  yourName: string;

  /** Browser tab title. */
  title: string;

  /** Short description shown in search results / link previews. */
  metaDescription: string;

  /** A short line on the envelope, e.g. "for her birthday". */
  envelopeLabel: string;

  /** Optional date shown on the opening letter page (presentation only). */
  letterDate?: string;

  /** Optional music track. Drop an MP3 into public/assets/audio/
   *  and set this to its path, e.g. "/assets/audio/our-song.mp3".
   *  Leave empty ("") to hide the music player entirely. */
  musicTrack: string;

  /** Label shown next to the music player. */
  musicLabel: string;

  /**
   * Optional handwritten note after the ending.
   * If empty or undefined, the closing note is not rendered.
   * Use template literals for multi-line notes.
   */
  closingNote?: string;
}

export const site: SiteConfig = {
  herName: "Her Name",
  yourName: "Your Name",

  title: "For Her Name",
  metaDescription: "A letter, written just for you.",

  envelopeLabel: "for her birthday",

  letterDate: "August 2, 2026",

  musicTrack: "",
  musicLabel: "a little music, if you'd like",

  closingNote: `P.S. Sorry if this letter is a little janky.`,
};