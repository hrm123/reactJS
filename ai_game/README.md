# Procedural Avatar Maker

A demo app showing procedural generation — type any name and get a unique, deterministic character with a generated SVG avatar.

## How it works

The character is generated entirely from the input name, with no randomness:

1. The name is hashed into a numeric seed using FNV-1a
2. That seed drives a stateful PRNG ([lib/seededRandom.ts](lib/seededRandom.ts))
3. The PRNG picks a colour palette, job, mood, eye size, and accessory from fixed lists
4. The [Avatar component](components/Avatar.tsx) renders the character as an inline SVG

The same name always produces the same character. Change one letter and you get a completely different one.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and type a name into the input field.

## Project structure

```text
app/page.tsx          — main page, input field and character data display
components/Avatar.tsx — SVG avatar renderer
lib/seededRandom.ts   — hash + PRNG + character generation logic
```
