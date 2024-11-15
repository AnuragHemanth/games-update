const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let boardState = Array(9).fill(null); // Tracks the board state

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // Place mark if cell is empty
    if (!boardState[cellIndex] && !checkWin()) {
        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCells();
        } else if (boardState.every(cell => cell)) {
            statusText.textContent = "It's a tie!";
        } else {
            // Switch turns
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });
}

function highlightWinningCells() {
    WINNING_COMBINATIONS.forEach(combination => {
        if (combination.every(index => boardState[index] === currentPlayer)) {
            combination.forEach(index => cells[index].classList.add("winning"));
        }
    });
}

function resetGame() {
    boardState.fill(null);
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning");
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
