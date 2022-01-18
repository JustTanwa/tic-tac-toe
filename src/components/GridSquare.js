import React from "react";
import "./GridSquare.css";

function GridSquare({value, onClick}) {

    return (
        <button className="square" onClick={onClick}>{value}</button>
    )
}

export default GridSquare;