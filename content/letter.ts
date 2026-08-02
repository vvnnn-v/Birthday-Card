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
 *    • Wrap conversational asides in <em>...</em> for italics.
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

  /** Optional CSS object-position for photo cropping inside the frame. */
  imagePosition?: string;

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
      `Happy Birthday. <em>Hi, bb.</em> A few days ago, you told me that if I ever didn't know what to get you for your birthday, you wanted a detailed explanation of everything I love about you, why I'm grateful for you, and exactly how I perceive you. I've been thinking about that ever since.`,
      `At first, I thought I'd just write you a letter. Then I realized I couldn't, not because I had nothing to say, but because every time I thought I was done, I'd remember something else I wanted to tell you. <em>So... I made this instead.</em>`,
      `I don't think this is everything. I honestly don't think I'll ever be able to fit everything into words, but this is probably the closest I'll get.`,
    ],
    note: `a little note, just for you`,
    image: "/assets/photos/01-intro.jpg",
    imageAlt: "A memory that belongs to us",
  },
  {
    id: "warmth",
    kicker: "One",
    title: "The First Thing I Noticed",
    paragraphs: [
      `I don't think the first thing I noticed about you was how you looked. <em>Don't get me wrong, you are beautiful.</em> But I think what stayed with me more was this really quiet warmth you have.`,
      `I'm still not sure how to explain it properly. Whenever I can't explain something, I end up comparing it to something else, <em>so I'll do that again:</em> you're like the first sunlight in the morning, not the bright kind that immediately fills the whole room, but the soft kind that slowly makes everything feel warmer without you even realizing it's happening. That's how you felt to me.`,
      `It wasn't loud or overwhelming. It was just... comfortable.`,
    ],
    image: "/assets/photos/02-warmth.jpg",
    imageAlt: "The first thing I noticed",
  },
  {
    id: "little-things",
    kicker: "Two",
    title: "The Little Things I Don't Think You Realize",
    paragraphs: [
      `I think this is my favorite part, not because these are compliments, but because they're just things I've accidentally memorized: the expressions you make, the way your face changes when you're trying not to laugh, the way you look at me when you're annoyed, the way you pretend you aren't smiling even though it's really obvious <em>(akala kasi lahat biro eh)</em>. I don't think you realize how many of those little moments I've kept in my head.`,
      `Sometimes I catch myself remembering them for absolutely no reason. <em>It's funny how those tiny moments ended up sticking with me more than the big ones.</em>`,
    ],
    note: `I keep these in my head`,
    image: "/assets/photos/03-little-things.jpg",
    imageAlt: "The little things",
  },
  {
    id: "type-of-person-a",
    kicker: "Three",
    title: "You're The Type Of Person Who...",
    paragraphs: [
      `<em>You know what's funny?</em> If someone asked me to describe you, I don't think I'd use words like "kind," "smart," or "pretty." <em>You're fine af tho ngl, my baby's so pretty.</em> I'd probably just tell them the things you do.`,
      `You're the type of person who actually says what's on your mind. <em>Sometimes that scares me; sometimes I wish I could avoid difficult conversations.</em> You already know that's something I struggle with, but you've never really let me hide forever. You tell me when something's wrong, when I've hurt you, when something matters. <em>I won't pretend I always like hearing it at the moment, sometimes I get defensive or need a little time before everything actually sinks in</em>, but I'm glad you still tell me anyway. Because if you didn't, I'd probably keep making the same mistakes without realizing it.`,
    ],
    image: "/assets/photos/04-type-of-person.jpg",
    imageAlt: "The type of person you are",
  },
  {
    id: "type-of-person-b",
    kicker: "Three",
    title: "You're The Type Of Person Who...",
    paragraphs: [
      `You're also the type of person who notices little things, you'll somehow notice when something's bothering me before I even know how to explain it. You never make me feel stupid for overthinking; you just let me talk until I eventually figure out what I'm trying to say, and I don't think you realize how much that helps me.`,
      `<em>Also...</em> you always insist on paying for yourself. As much as I like treating you, I honestly admire that about you. <em>But I'm still going to try and spoil you whenever I can, so good luck arguing with me.</em> <em>Bb kung mag-aaway man tayo pls eto na lang.</em>`,
    ],
    image: "/assets/photos/04b-notices-little-things.jpg",
    imageAlt: "You notice little things",
    imagePosition: "center top",
  },
  {
    id: "reminders",
    kicker: "Four",
    title: "Things That Remind Me Of You",
    paragraphs: [
      `This one was surprisingly easy, not because one thing reminds me of you, but because way too many things do: chasing cars, afternoon sunlight, seeing yellow, frogs. Even doing nothing makes me think about you.`,
      `Sometimes I'll see something completely random and my first thought is to send it to you. <em>I don't even realize I'm doing it anymore, I just do.</em>`,
    ],
    image: "/assets/photos/05-reminders.jpg",
    imageAlt: "Things that remind me of you",
  },
  {
    id: "changed",
    kicker: "Five",
    title: "Things You've Changed",
    paragraphs: [
      `This is probably the hardest part to write, not because I can't think of anything, but because I don't know where to start. Before you, I don't think I'd ever spend this much time thinking about how to answer one question. Now I'm sitting here making an entire website because one message from you made me stop and think, <em>"How the fuck am I gonna answer this?"</em>`,
      `I don't think you changed who I am. I think you've made me realize that people can't read my mind. As much as I'd like to believe people just know how much they mean to me… <em>they don't.</em> <em>So I guess this is me finally saying it.</em> <em>I guess that's why this exists,</em> because I don't ever want you to have to guess.`,
    ],
    image: "/assets/photos/06-changed.jpg",
    imageAlt: "Things you've changed",
  },
  {
    id: "grateful",
    kicker: "Six",
    title: "What I'm Grateful For",
    paragraphs: [
      `I think what I'm most grateful for is that you stayed. We definitely haven't had a perfect relationship, we've had misunderstandings, conversations that weren't easy, and times we've hurt each other without meaning to. But every single time, you still chose to sit down with me instead of walking away.`,
      `You stayed. You talked to me. You kept trying with me. I don't think I'll ever take that for granted. Thank you for staying.`,
    ],
    note: `thank you for staying`,
    image: "/assets/photos/07-grateful.jpg",
    imageAlt: "What I'm grateful for",
  },
  {
    id: "perceive",
    kicker: "Seven",
    title: "How I Perceive You",
    paragraphs: [
      `You asked me how I perceive you. I don't think I can answer that with a few adjectives, because that's never really been how I've seen you. I think of you through moments: the way you laugh when you're trying not to, the way you communicate even when the conversation isn't easy, the way you remember little things people tell you.`,
      `The way you somehow make me feel heard, even when I don't know what I'm trying to say; the way I instinctively want to tell you things first; the way ordinary places slowly become places I associate with you. I still find myself noticing new things about you, and if someone asked me to describe you, I'd probably just tell them stories or maybe just tell them about <em>that quiet warmth I keep talking about.</em> After all this time, I still don't think I've found a better way to describe you.`,
    ],
    image: "/assets/photos/08-perceive.jpg",
    imageAlt: "How I perceive you",
  },
  {
    id: "ending",
    kicker: "Lastly",
    title: "Ending",
    paragraphs: [
      `Happy Birthday. Thank you for every conversation, every laugh, every hug, every random walk, every memory. Thank you for choosing me and for staying.`,
      `Happy Birthday, baby, and happy monthsary. I love you, baby.`,
    ],
    image: "/assets/photos/09-ending.jpg",
    imageAlt: "Us",
    type: "ending",
  },
];
