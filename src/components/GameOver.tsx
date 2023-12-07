export default function GameOver({ winner, resetMatch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={resetMatch}>Rematch!</button>
      </p>
    </div>
  );
}