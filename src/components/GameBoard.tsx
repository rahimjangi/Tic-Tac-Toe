import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare,activePlayerSymbol}) {
  
    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });
         onSelectSquare();
    }
   

    return (
      <ol id="game-board">
        {gameBoard.map((row, rowId) => (
          <li key={rowId}>
            <ol>
              {row.map((playerSymbol, colId) => (
                <li key={colId}>
                      <button onClick={() => handleSelectSquare(rowId, colId)}>
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