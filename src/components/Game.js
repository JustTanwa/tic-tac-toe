import React, { useState } from "react";
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
            setPlayer("2");
        } else if (player === "2") {
            curGrid[i] = "O";
            setGrid(curGrid);
            setPlayer("1");
        }
    }

    const restartGame = () => {
        setGrid(initialGrid);
    }

    const showWinner = () => {
        if (winner) {
            return <p className="winner">{winner}</p>
        }
    }

    return (
        <div id="main">
            <Grid grid={grid} onClick={handleClick} />
            <div className="playerUI">
                <p>Player 1: X</p>
                <button className="restartBtn" onClick={() => restartGame()}> New game </button> 
                <p>Player 2: O</p>
            </div>

            {showWinner()}
        </div>

    )
}

export default Game;