const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

// Sound files
const winSound = new Audio("assets/win.wav");
const loseSound = new Audio("assets/lose.wav");

// Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle player click
function handleCellClick(e) {
    const index = e.target.dataset.index;

    // Prevent clicking same box or after game ends
    if (board[index] !== "" || !gameActive) return;

    // Place current player's mark
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check result
    checkWinner();
}

// Check winner or draw
function checkWinner() {
    let won = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            won = true;
            break;
        }
    }

    // If player wins
    if (won) {
        winSound.play();
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // If board is full and no winner = draw
    if (!board.includes("")) {
        loseSound.play();
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

// Restart game
function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Player X Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);