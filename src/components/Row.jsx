import Tile from './Tile.jsx';
import { evaluateGuess } from '../utils/evaluateGuess.js';

export default function Row({ guess = '', solution, submitted = false }) {
  const statuses = submitted ? evaluateGuess(guess, solution) : [];
  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, i) => (
        <Tile key={i} letter={guess[i] || ''} status={statuses[i] || ''} />
      ))}
    </div>
  );
}
