/*const GameController = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // Private game board
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    //factory
    
});*/

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("names");
    const player1NameInput = document.getElementById("first-name");
    const player2NameInput = document.getElementById("second-name");

    const player1Display = document.querySelector("#player1-info .name");
    const player2Display = document.querySelector("#player2-info .name");
    const player1Marker = document.querySelector("#player1-info .marker");
    const player2Marker = document.querySelector("#player2-info .marker");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // preventing refresh

        const name1 = player1NameInput.value.trim();
        const name2 = player2NameInput.value.trim();

        if (name1 && name2) {
            // display names
            player1Display.textContent = name1;
            player2Display.textContent = name2;

            // markers
            player1Marker.textContent = "X";
            player2Marker.textContent = "O";

            // hiding forms
            form.style.display = "none";
        }
    });
});

const Player = (name, sign) => {
    let score = 0;
    return { name, sign, score };
};

const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getBoard, setCell, reset };
})();

const GameController = (function () {
    const player1 = Player("Player 1", "X");
    const player2 = Player("שחקן 2", "O");
    let currentPlayer = player1;

    const playRound = (index) => {
        if (Gameboard.setCell(index, currentPlayer.marker)) {
            DisplayController.update();
            switchPlayer();
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    return { playRound, getCurrentPlayer };
})();

const DisplayController = (function () {
    const boardDiv = document.getElementById("gameboard");
  
    const update = () => {
      boardDiv.innerHTML = "";
      Gameboard.getBoard().forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => {
          GameController.playRound(index);
        });
        boardDiv.appendChild(cellDiv);
      });
    };
  
    update(); // רינדור ראשוני
  
    return { update };
  })();