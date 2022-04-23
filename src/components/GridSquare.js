import React from "react";
import "./GridSquare.css";

function GridSquare({value, onClick}) {

    return (
        <button className={`square ${value ? value: ""}`} onClick={onClick}><span>{value}</span></button>
    )
}

export default GridSquare;