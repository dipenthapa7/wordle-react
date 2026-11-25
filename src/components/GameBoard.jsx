import Row from './Row.jsx';

export default function GameBoard({ pastGuesses, currentGuess, solution }) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    if (i < pastGuesses.length) {
      rows.push(<Row key={i} guess={pastGuesses[i]} solution={solution} submitted />);
    } else if (i === pastGuesses.length) {
      rows.push(<Row key={i} guess={currentGuess} solution={solution} />);
    } else {
      rows.push(<Row key={i} solution={solution} />);
    }
  }
  return <div className="board">{rows}</div>;
}
