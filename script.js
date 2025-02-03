const GameController = (function () {
    let board = ["", "", "", "", "", "", "", "", ""]; // Private game board
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    //factory
    const Player = (name, sign) => {
        this.score = 0;
        return { name, sign, score };
    };
});