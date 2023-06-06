import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.10}) => {
  const createBoard = () => {
    return Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
  };
  const [board, setBoard] = useState(createBoard());



  const hasWon = () => {
    return board.every((row) => row.every((cell) => !cell));
  };

  const flipCellsAround = (coord) => {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map((row) => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  };

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  const tblBoard = Array.from({ length: nrows }, (row, y) => (
    <tr key={y}>
      {Array.from({ length: ncols }, (cell, x) => {
        const coord = `${y}-${x}`;
        return (
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      })}
    </tr>
  ));

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
};

export default Board;