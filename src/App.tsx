import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINING_COMBINATIONS } from "./WINING_COMBINATIONS";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    // console.log(gameTurns[0].player);
    currentPlayer = "O";
  }
  return currentPlayer;
}
 


function App() {
  // const [hasWinner, setHasWinner] = useState(false);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(arr=>[...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combination of WINING_COMBINATIONS) {
    const firstSuareSymbol=gameBoard[combination[0].row][combination[0].col]
    const secondSuareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSuareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (firstSuareSymbol && firstSuareSymbol == secondSuareSymbol && firstSuareSymbol == thirdSuareSymbol) {
      console.log("WINWIN", firstSuareSymbol);
      winner = firstSuareSymbol;
    }
  }
  let hasDraw = gameTurns.length >= 9 &&! winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        // console.log(prevTurns[0].player);
        currentPlayer = "O";
      }
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRematch() {
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner|| hasDraw) && <GameOver winner={winner} resetMatch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
