const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let gameState = {
  board: Array(9).fill(null),
  isXNext: true,
  players: {}, // Stores player names: { X: "Player 1", O: "Player 2" }
};

const playerConnections = {}; // Store WebSocket clients by player symbol

// Function to broadcast the game state (excluding WebSocket objects)
const broadcastState = () => {
  const stateToSend = { ...gameState }; // Copy the state
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(stateToSend));
    }
  });
};

wss.on("connection", (ws) => {
  console.log("New player connected!");

  // Assign "X" or "O" to the new player
  let playerSymbol = Object.keys(playerConnections).length === 0 ? "X" : "O";
  playerConnections[playerSymbol] = ws;

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "setName") {
      gameState.players[playerSymbol] = data.name;
    } else if (data.type === "move") {
      gameState.board = data.board;
      gameState.isXNext = data.isXNext;
    } else if (data.type === "reset") {
      gameState.board = Array(9).fill(null);
      gameState.isXNext = true;
    }

    broadcastState(); // Send updated state to all players
  });

  ws.on("close", () => {
    console.log(`Player ${playerSymbol} disconnected`);
    delete playerConnections[playerSymbol]; // Remove the player connection
  });

  ws.send(JSON.stringify(gameState)); // Send initial game state
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WebSocket Server running on port ${PORT}`));
