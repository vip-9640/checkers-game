import React from 'react';
import { Square } from './Square';
import { Board as BoardType, Position, Move } from '../game/types';
import '../styles/Board.css';

interface BoardProps {
  board: BoardType;
  selectedPiece: Position | null;
  validMoves: Move[];
  onSquareClick: (position: Position) => void;
}

export const Board: React.FC<BoardProps> = ({ board, selectedPiece, validMoves, onSquareClick }) => {
  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(m => m.to.row === row && m.to.col === col);
  };

  const isSelected = (row: number, col: number): boolean => {
    return selectedPiece?.row === row && selectedPiece?.col === col;
  };

  return (
    <div className="board">
      {board.squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => {
            const isPlayable = (rowIndex + colIndex) % 2 === 1;
            return (
              <Square
                key={`${rowIndex}-${colIndex}`}
                piece={square?.piece || null}
                isPlayable={isPlayable}
                isSelected={isSelected(rowIndex, colIndex)}
                isValidMove={isValidMove(rowIndex, colIndex)}
                position={{ row: rowIndex, col: colIndex }}
                onClick={onSquareClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
