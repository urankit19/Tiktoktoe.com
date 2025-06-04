document.addEventListener('DOMContentLoaded', () => {
    const board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;

    const statusDiv = document.getElementById('status');
    const boardDiv = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');

    function renderBoard() {
        boardDiv.innerHTML = '';
        board.forEach((cell, idx) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => handleCellClick(idx));
            boardDiv.appendChild(cellDiv);
        });
    }

    function handleCellClick(idx) {
        if (!gameActive || board[idx]) return;
        board[idx] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            statusDiv.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell)) {
            statusDiv.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDiv.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8], // rows
            [0,3,6],[1,4,7],[2,5,8], // cols
            [0,4,8],[2,4,6]          // diags
        ];
        for (const pattern of winPatterns) {
            if (pattern.every(idx => board[idx] === currentPlayer)) {
                // Mark the winning cells
                pattern.forEach(idx => board[idx] = currentPlayer + '*');
                return true;
            }
        }
        return false;
    }

    resetBtn.addEventListener('click', () => {
        for (let i = 0; i < 9; i++) board[i] = '';
        currentPlayer = 'X';
        gameActive = true;
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
        renderBoard();
    });

    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();

    // Update renderBoard to remove the '*' and add a highlight class
    const originalRenderBoard = renderBoard;
    renderBoard = function() {
        boardDiv.innerHTML = '';
        board.forEach((cell, idx) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            if (cell.endsWith('*')) {
                cellDiv.textContent = cell[0];
                cellDiv.classList.add('win');
            } else {
                cellDiv.textContent = cell;
            }
            cellDiv.addEventListener('click', () => handleCellClick(idx));
            boardDiv.appendChild(cellDiv);
        });
    };
});