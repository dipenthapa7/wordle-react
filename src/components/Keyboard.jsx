const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export default function Keyboard({ keyStatuses, onKey }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, r) => (
        <div className="keyboard-row" key={row}>
          {r === 2 && (
            <button className="key wide" onClick={() => onKey('ENTER')}>Enter</button>
          )}
          {row.split('').map((letter) => (
            <button
              key={letter}
              className={`key ${keyStatuses[letter] || ''}`.trim()}
              onClick={() => onKey(letter)}
            >
              {letter}
            </button>
          ))}
          {r === 2 && (
            <button className="key wide" onClick={() => onKey('BACKSPACE')}>⌫</button>
          )}
        </div>
      ))}
    </div>
  );
}
