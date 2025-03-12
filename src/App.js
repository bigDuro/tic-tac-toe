import React, { useState } from "react";
import { Button, Typography, Container, Box } from "@mui/material";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tic Tac Toe
      </Typography>
      <Typography variant="h6" gutterBottom>
        {status}
      </Typography>
      
      {/* Board with background image */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gridTemplateRows: "repeat(3, 80px)",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(./tic-tac-toe1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "246px",
          height: "246px",
          margin: "auto",
          padding: "10px",
        }}
      >
        {board.map((value, index) => (
          <Box
            key={index}
            sx={{
              width: 80,
              height: 75,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              cursor: value ? "default" : "pointer",
              backgroundColor: "transparent",
            }}
            onClick={() => handleClick(index)}
          >
            {value}
          </Box>
        ))}
      </Box>

      <Button variant="contained" color="primary" onClick={resetGame} sx={{ mt: 2 }}>
        Reset Game
      </Button>
    </Container>
  );
};

export default TicTacToe;
