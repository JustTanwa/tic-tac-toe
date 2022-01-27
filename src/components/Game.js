import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import calculateWinner from "./Winner";
import "./Game.css";

function Game() {
    // Set initial grid to be empty
    const initialGrid = Array(9).fill(null);
    const [grid, setGrid] = useState(initialGrid);
    const [player, setPlayer] = useState("1");
    const [xWinCount, SetXWinCount] = useState(0);
    const [oWinCount, SetOWinCount] = useState(0);
    const [computer, setComputer] = useState(true);
    const [difficultyHard, setDifficultyHard] = useState(false);
    const winner = calculateWinner(grid);

    const handleClick = (i) => {
        // using spread syntax to copy the current grid
        const curGrid = [...grid]
        // return if winner already determine or grid already has element
        if (winner || curGrid[i]) return;

        // determine player
        if (player === "1") {
            curGrid[i] = "X";
            setGrid(curGrid);
            if (!computer) { setPlayer("2") };
        } else if (player === "2") {
            curGrid[i] = "O";
            setGrid(curGrid);
            setPlayer("1");
        }

        if (computer && difficultyHard) {
            setGrid(computerMoveHard(curGrid));
        } else if (computer) {
            setGrid(computerMove(curGrid));
        }
    }

    const randomIndex = () => {
        return Math.floor(Math.random() * 9);
    }

    const computerMove = (curGrid) => {
        let rand = randomIndex();
        if (!curGrid[4]) {
            curGrid[4] = "O";
        }else if (!curGrid[rand]) {
            curGrid[rand] = "O";
        } else if (!winner && curGrid.includes(null)) {
            computerMove(curGrid);
        }
        return curGrid;

    }

    const computerMoveHard = (curGrid) => {
        // implementing Minimax algorithm for choosing the best move.
        let bestScore = Infinity;
        let bestMove;
        // check all squares for available spots
        for (let i = 0; i < 9; i++) {
            if (curGrid[i] === null) {
                curGrid[i] = "O";
                // make move for ai then call minimax to get score
                let score = minimax(curGrid, 0, true)
                // undo move 
                curGrid[i] = null;
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i
                }
            }
        }

        curGrid[bestMove] = "O";

        return curGrid;
    }

    let scores = {
        X: 10,
        O: -10,
        tie: 0
    }

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
            let bestScore = -Infinity
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, false)
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, true)
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }

    }

    const restartGame = () => {
        setGrid(initialGrid);
        setPlayer("1");
    }

    const restartScore = () => {
        SetXWinCount(0);
        SetOWinCount(0);
    }

    const showWinner = () => {
        if (winner) {
            return <p className="winner">{winner}</p>
        }
    }

    const updateScore = () => {
        if (winner === "X") {
            SetXWinCount(prev => prev + 1);
        } else if (winner === "O") {
            SetOWinCount(prev => prev + 1);
        }

    }

    const togglePlayer = () => {
        // check if game start, if game start then cannot change to AI
        if (!grid.every(sq => sq === null)) return
        if (computer && !difficultyHard) {
            setDifficultyHard(true);
        } else if (computer && difficultyHard) {
            setComputer(!computer)
        } else {
            setComputer(!computer);
            setDifficultyHard(false)
        }
        
    }

    useEffect(() => {
        updateScore()
    }, [winner])

    return (
        <div id="main">
            <Grid grid={grid} onClick={handleClick} />
            <div className="playerUI">
                <p>Player 1: X</p>
                <button className="restartBtn" onClick={() => restartGame()}> New game </button>
                <p>{computer ? difficultyHard ? "AI Lvl:Hard" : "AI Lvl:Easy" : "Player 2: O"}<span className="difficulty" onClick={() => togglePlayer()}>&#8644;</span></p>
            </div>
            <div className="playerUI">
                <p className="score" >{xWinCount}</p>
                <button className="restartBtn" onClick={() => restartScore()}> Reset Score </button>
                <p className="score">{oWinCount}</p>
            </div>

            {showWinner()}
        </div>

    )
}

export default Game;