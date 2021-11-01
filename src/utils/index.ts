export function checkGuess(guess: Set<string>, answer: string): boolean {
  for (let l of Array.from(answer)) {
    if (!guess.has(l)) return false;
  }

  return true;
}
