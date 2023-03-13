let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const squares = document.querySelectorAll("td");
const message = document.querySelector("#message");

function markSquare() {
	if (board[this.id] !== "") {
		return;
	}

	this.textContent = player;
	board[this.id] = player;

	if (checkWin(player)) {
		message.textContent = `O jogador "${player}" venceu!`;
		disableSquares();
	} else if (checkDraw()) {
		message.textContent = "Empate!";
		disableSquares();
	} else {
		player = player === "X" ? "O" : "X";
		message.textContent = `É a vez do jogador "${player}"`;
	}
}

function checkWin(player) {
	for (let i = 0; i < winningCombinations.length; i++) {
		if (board[winningCombinations[i][0]] === player && board[winningCombinations[i][1]] === player && board[winningCombinations[i][2]] === player) {
			return true;
		}
	}
	return false;
}

function checkDraw() {
	return board.every(square => square !== "");
}

function disableSquares() {
	squares.forEach(square => square.removeEventListener("click", markSquare));
}

function resetGame() {
	player = "X";
	board = ["", "", "", "", "", "", "", "", ""];
	squares.forEach(square => {
		square.textContent = "";
		square.addEventListener("click", markSquare);
	});
	message.textContent = `É a vez do jogador "${player}"`;
}

squares.forEach(square => {
	square.addEventListener("click", markSquare);
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetGame);
