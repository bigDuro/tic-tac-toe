import React, { useState } from "react";
import { Button, Typography, Container, Box } from "@mui/material";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [xGray, setXGray] = useState(null);
  const [oGray, setOGray] = useState(null);
  const [shouldGrayX, setShouldGrayX] = useState(false);
  const [shouldGrayO, setShouldGrayO] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    const currentPlayer = isXNext ? "X" : "O";
    const currentMoves = isXNext ? [...xMoves] : [...oMoves];
    const grayIndex = isXNext ? xGray : oGray;

    console.log("Current Moves:", currentMoves);

    // Step 1: Remove grayed mark (if it exists)
    if (grayIndex !== null) {
      newBoard[grayIndex] = null;
      currentMoves.shift();
      isXNext ? setXGray(null) : setOGray(null);
    }

    // Step 2: Place the new mark
    newBoard[index] = currentPlayer;
    currentMoves.push(index);

    // Step 3: If moves exceed 3, set flag to gray on opponent’s next move
    if (currentMoves.length > 2) {
      isXNext ? setShouldGrayX(true) : setShouldGrayO(true);
    }

    // Step 4: Gray opponent's oldest if their flag is set
    if (isXNext && shouldGrayO && oGray === null && oMoves.length > 0) {
      const grayTarget = oMoves[0];
      newBoard[grayTarget] = "O-gray";
      setOGray(grayTarget);
      setShouldGrayO(false);
    } else if (!isXNext && shouldGrayX && xGray === null && xMoves.length > 0) {
      const grayTarget = xMoves[0];
      newBoard[grayTarget] = "X-gray";
      setXGray(grayTarget);
      setShouldGrayX(false);
    }

    // Update state
    setBoard(newBoard);
    isXNext ? setXMoves(currentMoves) : setOMoves(currentMoves);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      const v1 = squares[a], v2 = squares[b], v3 = squares[c];
      const norm = (v) => v?.includes("X") ? "X" : v?.includes("O") ? "O" : null;
      if (norm(v1) && norm(v1) === norm(v2) && norm(v1) === norm(v3)) {
        return norm(v1);
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setXMoves([]);
    setOMoves([]);
    setXGray(null);
    setOGray(null);
    setShouldGrayX(false);
    setShouldGrayO(false);
  };

  const renderCell = (value) => {
    const isGray = value?.includes("-gray");
    const display = value?.replace("-gray", "");
    const color = isGray ? "gray" : "black";
    return <span style={{ color }}>{display}</span>;
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tic Tac Toe
      </Typography>
      <Typography variant="h6" gutterBottom>
        {status}
      </Typography>

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
            {renderCell(value)}
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
