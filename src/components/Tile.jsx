export default function Tile({ letter = '', status = '' }) {
  const className = `tile ${status} ${letter && !status ? 'filled' : ''}`;
  return <div className={className.trim()}>{letter}</div>;
}
