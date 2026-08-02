# For Her — A Birthday Letter

A quiet, handcrafted birthday website. An envelope opens to reveal a physical stack of handwritten letters. Each letter is read one at a time — the active letter is always the focus, while the unread stack slowly thins and the read stack grows beside it. When every letter has been read, the stack returns to the envelope.

The letter is the product. The website only exists to present it beautifully.

---

## The only files you normally edit

| What you want to change | File / folder |
|---|---|
| Her name, your name, titles | `content/site.ts` |
| The letter itself (all text) | `content/letter.ts` |
| Photos | `public/assets/photos/` |
| Music | `public/assets/audio/` + `content/site.ts` |

Everything else stays untouched.

---

## Getting started

```bash
npm install
npm run dev      # local development with hot reload
npm run build    # production build → dist/
npm run preview  # preview the production build
```

---

## Writing the letter

Open `content/letter.ts`. Every section is an object in the `sections` array:

```ts
{
  id: "warmth",              // unique id
  kicker: "One",             // small label above the title
  title: "The First Thing I Noticed",
  paragraphs: [
    `Your first paragraph…`,
    `Your second paragraph…`,
  ],
  note: "a handwritten thought…",   // optional — use sparingly
  image: "/assets/photos/02-warmth.jpg",
  imageAlt: "The first thing I noticed",
}
```

- **Add a section** — append a new object to the array.
- **Remove a section** — delete its object.
- **Reorder** — move objects around.
- **Handwritten notes** — only a few across the whole letter, so they feel special.
- **Memories** — for the "Things That Remind Me Of You" section, use `memories` instead of (or alongside) paragraphs:

```ts
{
  id: "reminders",
  title: "Things That Remind Me Of You",
  memories: [
    { title: "Rainy afternoons", description: `…` },
    { title: "The way you laugh", description: `…` },
  ],
}
```

The ending section uses `type: "ending"` — it renders the signature, "I love you.", and the optional P.S. note.

---

## Adding photos

Drop your photos into `public/assets/photos/` using the exact filenames referenced in `content/letter.ts`:

```
public/assets/photos/
  01-intro.jpg
  02-warmth.jpg
  03-little-things.jpg
  04-reminders.jpg
  05-changed.jpg
  06-grateful.jpg
  07-perceive.jpg
  08-ending.jpg
```

Until a photo exists, the site shows an elegant paper placeholder with the expected filename. Add the real file and it appears automatically — no code changes.

---

## Adding music

1. Drop your MP3 into `public/assets/audio/`:

```
public/assets/audio/our-song.mp3
```

2. In `content/site.ts`, set:

```ts
musicTrack: "/assets/audio/our-song.mp3",
```

The player never autoplays — the visitor chooses when to start. If `musicTrack` is empty, the player hides itself.

---

## Site settings

In `content/site.ts`:

```ts
export const site = {
  herName: "Her Name",
  yourName: "Your Name",
  title: "For Her Name",
  metaDescription: "A letter, written just for you.",
  envelopeLabel: "for her birthday",
  musicTrack: "",
  musicLabel: "a little music, if you'd like",
  closingNote: `
P.S.

I'll probably think of ten more things after I finish this.
`,
};
```

- `closingNote` is optional. If it's empty or removed, the P.S. note simply doesn't appear.

---

## The experience

- An **envelope** opens to reveal a stack of letters.
- The **active letter** sits centered, naturally placed with a slight rotation — never perfectly aligned.
- The **unread stack** thins on the left; the **read stack** grows on the right.
- **Read Next** moves the current letter to the read stack; **Previous** brings it back.
- When all letters are read, the stack **returns to the envelope**.
- Arrow keys (← / →) navigate, or use the buttons.

## Design notes

- **Palette** — warm cream `#F8F4EC`, golden `#D8A84D`, bronze `#A67C52`, soft ink `#2D2D2D`, muted `#777777`.
- **Typography** — Cormorant Garamond (headings), Jost (body), Caveat (handwritten notes only).
- **Motion** — one envelope opening, then a gentle letter-by-letter reading flow. Nothing competes with reading.
- **Progress** — the current letter is saved to localStorage; a refresh returns you to where you were.

## Deploying

The project includes `netlify.toml` — connect the repo to Netlify and it builds automatically. Or run `npm run build` and deploy the `dist/` folder anywhere.