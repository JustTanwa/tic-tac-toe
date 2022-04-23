import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import calculateWinner from './Winner';
import './Game.css';

function Game() {
	// Set initial grid to be empty
	const initialGrid = Array(9).fill(null);
	const [grid, setGrid] = useState(initialGrid);
	const [player, setPlayer] = useState('1');
	const [xWinCount, setXWinCount] = useState(0);
	const [oWinCount, setOWinCount] = useState(0);
	const [compWinCount, setCompWinCount] = useState(0);
	const [draw, setDraw] = useState(0);
	const [computer, setComputer] = useState(true);
	const [difficultyHard, setDifficultyHard] = useState(false);
	const winner = calculateWinner(grid);

	const handleClick = (i) => {
		// using spread syntax to copy the current grid
		const curGrid = [...grid];
		// return if winner already determine or grid already has element
		if (winner || curGrid[i]) return;

		// determine player
		if (player === '1') {
			curGrid[i] = 'X';
			setGrid(curGrid);
			if (!computer) {
				setPlayer('2');
			}
		} else if (player === '2') {
			curGrid[i] = 'O';
			setGrid(curGrid);
			setPlayer('1');
		}

		if (computer && difficultyHard) {
			setGrid(computerMoveHard(curGrid));
		} else if (computer) {
			setGrid(computerMove(curGrid));
		}
	};

	const randomIndex = () => {
		return Math.floor(Math.random() * 9);
	};

	const computerMove = (curGrid) => {
		let rand = randomIndex();
		if (!curGrid[4]) {
			curGrid[4] = 'O';
		} else if (!curGrid[rand]) {
			curGrid[rand] = 'O';
		} else if (!winner && curGrid.includes(null)) {
			computerMove(curGrid);
		}
		return curGrid;
	};

	const computerMoveHard = (curGrid) => {
		// implementing Minimax algorithm for choosing the best move.
		let bestScore = Infinity;
		let bestMove;
		// check all squares for available spots
		for (let i = 0; i < 9; i++) {
			if (curGrid[i] === null) {
				curGrid[i] = 'O';
				// make move for ai then call minimax to get score
				let score = minimax(curGrid, 0, true);
				// undo move
				curGrid[i] = null;
				if (score < bestScore) {
					bestScore = score;
					bestMove = i;
				}
			}
		}

		curGrid[bestMove] = 'O';

		return curGrid;
	};

	let scores = {
		X: 10,
		O: -10,
		tie: 0,
	};

	const minimax = (board, depth, isMaximisingPlayer) => {
		// check if terminal state of the board and return value if winner or tie
		let result = calculateWinner(board);
		if (result) {
			let score = scores[result];
			return score;
		}
		// if not terminal state, for maximising player, go through all null spaces
		// and recursively call minimax until a value is found for each combo
		if (isMaximisingPlayer) {
			let bestScore = -Infinity;
			for (let i = 0; i < 9; i++) {
				if (board[i] === null) {
					board[i] = 'X';
					let score = minimax(board, depth + 1, false);
					board[i] = null;
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < 9; i++) {
				if (board[i] === null) {
					board[i] = 'O';
					let score = minimax(board, depth + 1, true);
					board[i] = null;
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	};

	const restartGame = () => {
		setGrid(initialGrid);
		setPlayer('1');
	};

	const showWinner = () => {
		if (winner) {
			return (
				<p className={`winner ${winner}`}>
					{winner === 'X' ? 'X wins' : winner === 'O' ? 'O wins' : "It's a Tie"}
				</p>
			);
		}
	};

	const updateScore = () => {
		if (winner === 'X') {
			setXWinCount((prev) => prev + 1);
		} else if (winner === 'O' && !computer) {
			setOWinCount((prev) => prev + 1);
		} else if (winner === 'O' && computer) {
			setCompWinCount((prev) => prev + 1);
		} else if (winner === 'tie') {
			setDraw((prev) => prev + 1);
		}
	};

	const togglePlayer = () => {
		// check if game start, if game start then cannot change to AI
		if (!grid.every((sq) => sq === null)) return;
		if (computer && !difficultyHard) {
			setDifficultyHard(true);
		} else if (computer && difficultyHard) {
			setComputer(!computer);
		} else {
			setComputer(!computer);
			setDifficultyHard(false);
		}
	};

	useEffect(() => {
		updateScore();
	}, [winner]);

	return (
		<div id='main'>
			<Grid grid={grid} onClick={handleClick} />
			{showWinner()}
			<div className='buttons'>
				<button className='newgame' onClick={restartGame}>
					New Game
				</button>
				<button className='computer' onClick={togglePlayer}>
					{computer && !difficultyHard
						? 'Hard AI'
						: computer && difficultyHard
						? '2 Players'
						: 'Easy AI'}
				</button>
			</div>
			<div className='controls'>
				<div className='playerone'>Player(X)</div>
				<div className='tie'>Tie</div>
				<div className='playertwo'>
					{computer ? 'Computer(O)' : 'Player(O)'}
				</div>
				<div className='playerOneScore'>{xWinCount}</div>
				<div className='tieScore'>{draw}</div>
				<div className='playerTwoScore'>
					{computer ? compWinCount : oWinCount}
				</div>
			</div>
		</div>
	);
}

export default Game;
