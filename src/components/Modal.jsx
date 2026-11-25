export default function Modal({ title, message, onRestart }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="restart" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}
