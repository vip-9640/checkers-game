import { Board, Piece, Square } from './types';

export function createInitialBoard(): Board {
  const squares: (Square | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Red pieces (top) - rows 0-2
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        squares[row][col] = { piece: { color: 'red', type: 'regular' } };
      }
    }
  }

  // Black pieces (bottom) - rows 5-7
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        squares[row][col] = { piece: { color: 'black', type: 'regular' } };
      }
    }
  }

  // Empty squares (rows 3-4) and non-playable squares
  for (let row = 3; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        squares[row][col] = { piece: null };
      }
    }
  }

  return { squares };
}

export function copyBoard(board: Board): Board {
  return {
    squares: board.squares.map(row =>
      row.map(square => (square ? { piece: square.piece ? { ...square.piece } : null } : null))
    ),
  };
}

export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getPiece(board: Board, row: number, col: number): Piece | null {
  if (!isValidPosition(row, col)) return null;
  const square = board.squares[row][col];
  return square ? square.piece : null;
}

export function setPiece(board: Board, row: number, col: number, piece: Piece | null): void {
  if (!isValidPosition(row, col)) return;
  const square = board.squares[row][col];
  if (square) {
    square.piece = piece;
  }
}

export function isPlayableSquare(row: number, col: number): boolean {
  return (row + col) % 2 === 1;
}
