
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowId) => (
        <li key={rowId}>
          <ol>
            {row.map((playerSymbol, colId) => (
              <li key={colId}>
                <button
                  onClick={() => onSelectSquare(rowId, colId)}
                  disabled={playerSymbol != null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}