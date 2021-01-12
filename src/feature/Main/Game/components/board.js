import React from "react";
import "../index.css";
import Square from "./square";

export default function Board(props) {
  const renderSquare = (i) => {
    const isCurrent = props.currentIndex === i;
    const winnerList = props.winnerList;
    const isWinner = winnerList ? winnerList.includes(i) : false;
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isCurrent={isCurrent}
        isWinner={isWinner}
      />
    );
  };
  var board_rows = [];
  for (var i = 0; i < props.boardSize; i++) {
    var indents = [];
    for (var j = 0; j < props.boardSize; j++) {
      indents.push(renderSquare(i * props.boardSize + j));
    }
    const row = <div className="board-row">{indents}</div>;
    board_rows.push(row);
  }
  return <div>{board_rows}</div>;
}
