import React from "react";
import GridSquare from "./GridSquare";
import "./Grid.css";

function Grid({ grid, onClick, disabled }) {
    return (
        <div className="board">
            {grid.map((item, i) => (
                <GridSquare key={i} value={item} onClick={() => onClick(i) } disabled={disabled} />
            ))}
        </div>
    )
}

export default Grid;