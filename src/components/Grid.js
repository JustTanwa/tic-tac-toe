import React from "react";
import GridSquare from "./GridSquare";
import "./Grid.css";

function Grid({ grid, onClick }) {
    return (
        <div className="board">
            {grid.map((item, i) => (
                <GridSquare key={i} value={item} onClick={() => onClick(i)} />
            ))}
        </div>
    )
}

export default Grid;