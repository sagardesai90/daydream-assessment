import React, {useState} from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  }
  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
      }
    }
    return board.every(Boolean) ? 'Draw' : null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);

  };
  return (
    <div className='top'>
      <h1 className='title'>Tic Tac Toe</h1>
      <div className='board'>
        {board.map((value, index) => (
          <button className='cell' key={index} onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && (
        <div className='game-result'>
          <h2>
            {winner === 'Draw' ? 'Its a draw' : `Winner ${winner}`}
          </h2>
          <button className='reset-button' onClick={resetGame} >
            Reset Game
          </button>
        </div>
      )}
    </div>
  )
}

export default App;
