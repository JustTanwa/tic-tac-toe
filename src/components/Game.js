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
    const [computer, setComputer] = useState(false);
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
            if (!computer) {setPlayer("2")};
        } else if (player === "2") {
            curGrid[i] = "O";
            setGrid(curGrid);
            setPlayer("1");
        } 
        
        if (computer) {
            setGrid(computerMove(curGrid));
        }
    }

    const randomIndex = () => {
        return Math.floor(Math.random() * 9);
    }

    const computerMove = (curGrid) => {
        let rand = randomIndex();
        if (!curGrid[rand]) {
            curGrid[rand] = "O";
        } else {
            if (!winner) {
               computerMove(curGrid);
            }
        }
        return curGrid;
        
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

    useEffect(()=> {
        updateScore()
    },[winner])

    return (
        <div id="main">
            <Grid grid={grid} onClick={handleClick} />
            <div className="playerUI">
                <p>Player 1: X</p>
                <button className="restartBtn" onClick={() => restartGame()}> New game </button>
                <p onClick={() => setComputer(!computer)}>{computer? "Computer" : "Player 2: O"}</p>
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