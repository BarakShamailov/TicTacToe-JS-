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

    return {player1,player2,currentPlayer};

    
};
const game = GameController("barak","vered");

function Gameboard () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

 

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
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
                }   
                console.log(board)              
              
                
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