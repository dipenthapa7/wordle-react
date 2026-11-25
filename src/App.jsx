import { useState, useEffect, useCallback, useMemo } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import Modal from './components/Modal.jsx';
import { pickRandomWord } from './utils/words.js';
import { buildKeyStatuses } from './utils/evaluateGuess.js';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export default function App() {
  const [solutionWord, setSolutionWord] = useState(pickRandomWord);
  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); // IN_PROGRESS | WON | LOST
  const [message, setMessage] = useState('');

  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== 'IN_PROGRESS') return; // halt input after game ends

      if (key === 'BACKSPACE') {
        setCurrentGuess((g) => g.slice(0, -1));
      } else if (key === 'ENTER') {
        if (currentGuess.length < WORD_LENGTH) {
          setMessage('Not enough letters');
          return;
        }
        const updated = [...pastGuesses, currentGuess];
        setPastGuesses(updated);
        setCurrentGuess('');
        setMessage('');
        if (currentGuess === solutionWord) setGameStatus('WON');
        else if (updated.length === MAX_GUESSES) setGameStatus('LOST');
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((g) => g + key);
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord]
  );

  // Physical keyboard: listener is attached once per handler change and cleaned up
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const keyStatuses = useMemo(
    () => buildKeyStatuses(pastGuesses, solutionWord),
    [pastGuesses, solutionWord]
  );

  const restart = () => {
    setSolutionWord(pickRandomWord());
    setCurrentGuess('');
    setPastGuesses([]);
    setGameStatus('IN_PROGRESS');
    setMessage('');
  };

  return (
    <div className="app">
      <h1>WORDLE</h1>
      <div className="message">{message}</div>
      <GameBoard pastGuesses={pastGuesses} currentGuess={currentGuess} solution={solutionWord} />
      <Keyboard keyStatuses={keyStatuses} onKey={handleKey} />
      {gameStatus === 'WON' && (
        <Modal title="You Won! 🎉" message={`Solved in ${pastGuesses.length}/6 guesses.`} onRestart={restart} />
      )}
      {gameStatus === 'LOST' && (
        <Modal title="Game Over" message={`The word was ${solutionWord}.`} onRestart={restart} />
      )}
    </div>
  );
}
