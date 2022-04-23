import React from "react";
import "./GridSquare.css";

function GridSquare({value, onClick, disabled}) {

    return (
        <button className={`square ${value ? value: ""}`} onClick={onClick} disabled={disabled}><span>{value}</span></button>
    )
}

export default GridSquare;