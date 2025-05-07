/*const GameController = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // Private game board
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    //factory
    
});*/
const Player = (name, sign) => {
    let score = 0;
    return { name, sign, score };
};

function GameController (name1,name2) {
    const player1 = Player(name1, "X");
    const player2 = Player(name2, "O");
    let currentPlayer = "X";
    const player1Info = document.getElementById("player1-info");
    const player2Info = document.getElementById("player2-info");

    const updateActivePlayerUI = () => {
        if (game.currentPlayer === "X") {
            player1Info.classList.add("active-player");
            player2Info.classList.remove("active-player");
        } else {
            player2Info.classList.add("active-player");
            player1Info.classList.remove("active-player");
        }
    };

    return {player1,player2,currentPlayer,updateActivePlayerUI};

    
};
const game = GameController("barak","vered");
game.updateActivePlayerUI();
const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

const MAX_COMBO = 8

function Gameboard () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const check3WIn = () => {
        console.log(` ${game.currentPlayer} turn`)
        for (let i = 0; i < MAX_COMBO; i++) {
            if (board[winningCombos[i][0]] !== "" && board[winningCombos[i][0]] === board[winningCombos[i][1]] &&
                board[winningCombos[i][0]] === board[winningCombos[i][2]]){
                if (board[winningCombos[i][0]] === 'X')
                {
                    console.log(`Congratsultions ${game.player1.name} won !`);
                    markerWinnerCells(...winningCombos[i]);
                }
                else{
                    console.log(`Congratsultions ${game.player2.name} won !`);
                    markerWinnerCells(...winningCombos[i]);
                }
                return true;
            }
        }
    };

    const markerWinnerCells = (a,b,c) =>{
        document.querySelector(`[data-index="${a}"]`).classList.add("winning-cell");
        document.querySelector(`[data-index="${b}"]`).classList.add("winning-cell");
        document.querySelector(`[data-index="${c}"]`).classList.add("winning-cell");
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
            document.querySelector(`[data-index="${i}"]`).textContent = "";
        }
    };
    const boardElement = document.querySelector(".board");

    const createBoard = () => {
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            boardElement.appendChild(cell);
            
            cell.addEventListener("click", (e) => {
                const indexCell = e.target.dataset.index;
                if (cell.textContent === ""){
                    cell.textContent = game.currentPlayer;
                    board[indexCell] = game.currentPlayer;
                    cell.textContent = game.currentPlayer;
                    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
                    game.updateActivePlayerUI();
                    check3WIn();
                }   
            });
        
            boardElement.appendChild(cell);
            
        }
    }

    return { getBoard, reset, createBoard };
};

const board = Gameboard();

board.createBoard();


//Starting game
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
        const game = GameController(name1,name2);


        if (name1 && name2) {
            
            // display names
            player1Display.textContent = name1;
            player2Display.textContent = name2;
            // markers
            player1Marker.textContent = "X";
            player2Marker.textContent = "O";

     
            // hiding forms
            form.style.display = "none";
            resetBtn.style.display = "inline-block";
            //board.createBoard();
        }
    });
});






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