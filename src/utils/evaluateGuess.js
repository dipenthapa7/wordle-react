/**
 * Evaluates a guess against the solution using the classic two-pass rule
 * so duplicate letters are handled correctly.
 * Returns an array of 'correct' | 'present' | 'absent' (one per tile).
 */
export function evaluateGuess(guess, solution) {
  const result = Array(guess.length).fill('absent');
  const remaining = {};

  // Pass 1: mark greens and count the unmatched solution letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct';
    } else {
      remaining[solution[i]] = (remaining[solution[i]] || 0) + 1;
    }
  }

  // Pass 2: mark yellows only while unmatched copies remain
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    if (remaining[guess[i]] > 0) {
      result[i] = 'present';
      remaining[guess[i]]--;
    }
  }
  return result;
}

const RANK = { absent: 1, present: 2, correct: 3 };

/** Builds a { LETTER: status } map, keeping the best status seen per letter. */
export function buildKeyStatuses(pastGuesses, solution) {
  const map = {};
  pastGuesses.forEach((guess) => {
    evaluateGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i];
      if (!map[letter] || RANK[status] > RANK[map[letter]]) map[letter] = status;
    });
  });
  return map;
}
