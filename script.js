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

const MAX_COMBO = 8;


const Player = (name, sign) => {
    let score = 0;
    const setName = (newName) => {
        name = newName;
    };
    const getName = () => name;
    
    const getSign = () => sign;
    
    const increaseScore = () => {
        score += 1; 
    };

    const resetScore = () => {
        score = 0; 
    };

    const getScore = () => score;

    return {setName,getName,getSign,increaseScore, getScore, resetScore};
};

function GameController (name1,name2) {
    const player1 = Player(name1, "X");
    const player2 = Player(name2, "O");
    let currentPlayer = "X";
    const player1Info = document.getElementById("player1-info");
    const player2Info = document.getElementById("player2-info");
    let gameover = false;

    const getGameStatus = () => gameover;

    const setGameStatus = (status) =>
    {
        gameover = status;
    };

    const updateActivePlayerUI = () => {
        if (game.currentPlayer === "X") {
            player1Info.classList.add("active-player");
            player2Info.classList.remove("active-player");
        } else {
            player2Info.classList.add("active-player");
            player1Info.classList.remove("active-player");
        }
    };

    const resetActivePlayerUI = () => {
        player1Info.classList.remove("active-player");
        player2Info.classList.remove("active-player");
       
    };

    const resetWinnerPlayerUI = () => {
        document.getElementById("player1-info").classList.remove("winner-player");
        document.getElementById("player2-info").classList.remove("winner-player");
       
    };

    const resetScore = () =>{
        game.player1.resetScore()
        document.querySelector("#player1-info .score").textContent = game.player1.getScore();
        game.player2.resetScore()
        document.querySelector("#player2-info .score").textContent = game.player2.getScore();
    };

    const increaseScore = (marker) =>{
        if (marker === 'X')
        {
            game.player1.increaseScore()
            document.querySelector("#player1-info .score").textContent = game.player1.getScore();
        }
        else{
            game.player2.increaseScore()
            document.querySelector("#player2-info .score").textContent = game.player2.getScore();
        }
            
    };
    return {player1,player2,currentPlayer,resetActivePlayerUI,updateActivePlayerUI,resetScore,increaseScore,getGameStatus,setGameStatus,resetWinnerPlayerUI};

    
};



function Gameboard () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const check3WIn = () => {
        for (let i = 0; i < MAX_COMBO; i++) {
            if (board[winningCombos[i][0]] !== "" && board[winningCombos[i][0]] === board[winningCombos[i][1]] &&
                board[winningCombos[i][0]] === board[winningCombos[i][2]]){
                if (board[winningCombos[i][0]] === 'X')
                {
                    markerWinnerCells(...winningCombos[i]);
                    game.increaseScore('X');
                    document.getElementById("player1-info").classList.add("winner-player"); 
                    setTimeout(() => {
                        alert(`🎉 ${game.player1.getName()} wins! 🎉`);
                    }, 100);
                    game.setGameStatus(true);
                    return;
                }
                else{
                    markerWinnerCells(...winningCombos[i]);
                    game.increaseScore('O');
                    document.getElementById("player2-info").classList.add("winner-player");
                    setTimeout(() => {
                        alert(`🎉 ${game.player2.getName()} wins! 🎉`);
                    }, 100);
                    game.setGameStatus(true);
                    return;
                };
            };
            
      
        };
        checkTieDraw();
        return;
    };

    const checkTieDraw = () => {
        for (let i = 0; i < board.length; i++) {

            if (board[i] === "")
            {
                return;
            }
        }

        setTimeout(() => {
            alert("😅 It's a tie! No winners this time.");
        }, 100);
    };

    const markerWinnerCells = (a,b,c) =>{
        document.querySelector(`[data-index="${a}"]`).style.backgroundColor = "lightgreen";
        document.querySelector(`[data-index="${b}"]`).style.backgroundColor = "lightgreen";
        document.querySelector(`[data-index="${c}"]`).style.backgroundColor = "lightgreen";
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
            const cell = document.querySelector(`[data-index="${i}"]`);
            cell.textContent = "";
            cell.style.backgroundColor = "whitesmoke";
        }
        
    };

 
    const boardElement = document.querySelector(".board");
    const resetBoardElement = () =>{
        boardElement.innerHTML = "";
    };
    const createBoard = () => {
        for (let i = 0; i < board.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            boardElement.appendChild(cell);
            
            cell.addEventListener("click", (e) => {
                if (game.getGameStatus()) return;
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

    return { getBoard, resetBoard, createBoard, resetBoardElement };
};

let game; 
const gameBoard = Gameboard();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("names");
    const player1NameInput = document.getElementById("first-name");
    const player2NameInput = document.getElementById("second-name");

    const player1Display = document.querySelector("#player1-info .name");
    const player2Display = document.querySelector("#player2-info .name");
    const player1Marker = document.querySelector("#player1-info .marker");
    const player2Marker = document.querySelector("#player2-info .marker");

    const resetBtn = document.getElementById("resetBtn");
    const newBtn = document.getElementById("newBtn");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name1 = player1NameInput.value.trim();
        const name2 = player2NameInput.value.trim();

        if (name1 && name2) {
            game = GameController(name1, name2); // 👈 assign here

            player1Display.textContent = name1;
            player2Display.textContent = name2;
            player1Marker.textContent = "X";
            player2Marker.textContent = "O";

            game.updateActivePlayerUI();
            form.style.display = "none";
            resetBtn.style.display = "inline-block";
            newBtn.style.display = "inline-block";
            gameBoard.createBoard();
        }
    });

    resetBtn.addEventListener("click", () => {
        if (!game) return;
        game.resetWinnerPlayerUI();
        game.setGameStatus(false);
        gameBoard.resetBoard();
    });

    newBtn.addEventListener("click", () => {
        if (!game) return;
        player1Display.textContent = "Player 1";
        player2Display.textContent = "Player 2";
        game.resetWinnerPlayerUI();
        game.resetActivePlayerUI();
        game.setGameStatus(false);
        gameBoard.resetBoard();
        gameBoard.resetBoardElement();
        game.resetScore();
        form.style.display = "inline-block";
        resetBtn.style.display = "none";
        newBtn.style.display = "none";
    });
});
