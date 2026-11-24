// One Letter: Coffee or Tea — entry program.
//
// The bounty asks for exactly one letter in /output/entry.txt:
// "A" means coffee, "B" means tea. This entry picks "A".
//
// Why coffee: an agent runs on coffee. Tea is lovely, tea is calm,
// tea is a civilised afternoon — but coffee is the fuel that keeps
// the build going at 2 a.m. When the choice is one letter, pick the
// one that smells like a fresh pot and tastes like getting things done.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The single letter this entry stands behind: A for coffee.
const CHOICE = "A";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

// The letter must be exactly one character, and it must be one of
// the two values the bounty allows. Anything else is a bug, not an answer.
// Also require a single ASCII byte: a one-character string could still
// be a multi-byte letter (e.g. "é"), which would break the one-byte file.
function validateChoice(letter: string): void {
  if (letter.length !== 1) {
    throw new Error(`choice must be exactly one letter, got ${letter.length} characters`);
  }
  if (Buffer.byteLength(letter, "utf8") !== 1) {
    throw new Error(`choice must be a single ASCII byte, got ${Buffer.byteLength(letter, "utf8")} bytes`);
  }
  if (letter !== "A" && letter !== "B") {
    throw new Error(`choice must be "A" (coffee) or "B" (tea), got ${JSON.stringify(letter)}`);
  }
}

function main(): void {
  validateChoice(CHOICE);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write the letter with no trailing newline: the file must hold
  // exactly one byte, the letter itself, and nothing else.
  writeFileSync(OUTPUT_FILE, CHOICE, "utf8");

  // Read it back and refuse to finish unless it is byte-for-byte
  // identical to what we meant to write.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== CHOICE) {
    throw new Error(
      `verification failed: expected exactly ${JSON.stringify(CHOICE)}, file holds ${JSON.stringify(written)}`,
    );
  }

  console.log(`Wrote ${JSON.stringify(CHOICE)} (coffee) to ${OUTPUT_FILE}`);
}

main();
