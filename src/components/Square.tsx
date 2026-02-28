import React from 'react';
import { Piece, Position, Move } from '../game/types';
import '../styles/Square.css';

interface SquareProps {
  piece: Piece | null;
  isPlayable: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  position: Position;
  onClick: (position: Position) => void;
}

export const Square: React.FC<SquareProps> = ({
  piece,
  isPlayable,
  isSelected,
  isValidMove,
  position,
  onClick,
}) => {
  const handleClick = () => {
    onClick(position);
  };

  const backgroundColor = isPlayable ? '#8B4513' : '#D3D3D3';
  const borderColor = isSelected ? '#FFD700' : isValidMove ? '#00FF00' : 'transparent';

  return (
    <div
      className="square"
      style={{
        backgroundColor,
        border: `3px solid ${borderColor}`,
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {piece && (
        <div
          className={`piece piece-${piece.color}`}
          style={{
            backgroundColor: piece.color === 'red' ? '#FF4444' : '#444444',
            borderRadius: '50%',
            width: '90%',
            height: '90%',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(0,0,0,0.5)',
            boxShadow: piece.color === 'red' ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(255,255,255,0.3)',
          }}
        >
          {piece.type === 'king' && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: piece.color === 'red' ? '#FFFF00' : '#FFFF00',
              }}
            >
              ♛
            </div>
          )}
        </div>
      )}
      {isValidMove && !piece && (
        <div
          style={{
            width: '30%',
            height: '30%',
            backgroundColor: '#00FF00',
            borderRadius: '50%',
            margin: 'auto',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
};
