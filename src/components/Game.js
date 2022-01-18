import React, { useState } from "react";
import Grid from "./Grid";
import calculateWinner from "./Winner";

function Game() {
    // Set initial grid to be empty
    const initialGrid = Array(9).fill(null);
    const [grid, setGrid] = useState(initialGrid);
    const [player, setPlayer] = useState("1");
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

    return (
        <>
            <Grid grid={grid} onClick={handleClick} />
        </>

    )
}

export default Game;