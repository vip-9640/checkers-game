import { Board, GameState, Move, Position, PieceColor } from './types';
import { copyBoard, getPiece, setPiece, isValidPosition, isPlayableSquare } from './board';

export function getValidMoves(board: Board, position: Position, playerColor: PieceColor): Move[] {
  const piece = getPiece(board, position.row, position.col);
  if (!piece || piece.color !== playerColor) return [];

  const moves: Move[] = [];

  // Check for capture moves first (they're mandatory)
  const captureMoves = getCaptureMoves(board, position);
  if (captureMoves.length > 0) {
    return captureMoves;
  }

  // Regular moves
  const directions =
    piece.type === 'king'
      ? [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ]
      : piece.color === 'red'
      ? [
          [1, -1],
          [1, 1],
        ]
      : [
          [-1, -1],
          [-1, 1],
        ];

  for (const [dRow, dCol] of directions) {
    const newRow = position.row + dRow;
    const newCol = position.col + dCol;

    if (isValidPosition(newRow, newCol) && isPlayableSquare(newRow, newCol)) {
      const target = getPiece(board, newRow, newCol);
      if (!target) {
        moves.push({
          from: position,
          to: { row: newRow, col: newCol },
        });
      }
    }
  }

  return moves;
}

function getCaptureMoves(board: Board, position: Position, captured: Position[] = []): Move[] {
  const piece = getPiece(board, position.row, position.col);
  if (!piece) return [];

  const captureMoves: Move[] = [];
  const directions =
    piece.type === 'king'
      ? [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ]
      : piece.color === 'red'
      ? [
          [1, -1],
          [1, 1],
        ]
      : [
          [-1, -1],
          [-1, 1],
        ];

  for (const [dRow, dCol] of directions) {
    const midRow = position.row + dRow;
    const midCol = position.col + dCol;
    const newRow = position.row + dRow * 2;
    const newCol = position.col + dCol * 2;

    if (!isValidPosition(midRow, midCol) || !isValidPosition(newRow, newCol)) continue;
    if (!isPlayableSquare(newRow, newCol)) continue;

    const midPiece = getPiece(board, midRow, midCol);
    const target = getPiece(board, newRow, newCol);

    if (midPiece && midPiece.color !== piece.color && !target) {
      const isAlreadyCaptured = captured.some(p => p.row === midRow && p.col === midCol);
      if (!isAlreadyCaptured) {
        const newCaptured = [...captured, { row: midRow, col: midCol }];
        const moves = getCaptureMoves(board, { row: newRow, col: newCol }, newCaptured);

        if (moves.length > 0) {
          captureMoves.push(...moves);
        } else {
          captureMoves.push({
            from: position,
            to: { row: newRow, col: newCol },
            captures: newCaptured,
          });
        }
      }
    }
  }

  return captureMoves;
}

export function applyMove(board: Board, move: Move): Board {
  const newBoard = copyBoard(board);
  const piece = getPiece(newBoard, move.from.row, move.from.col);

  if (!piece) return newBoard;

  // Move piece
  setPiece(newBoard, move.to.row, move.to.col, piece);
  setPiece(newBoard, move.from.row, move.from.col, null);

  // Remove captured pieces
  if (move.captures) {
    for (const capturedPos of move.captures) {
      setPiece(newBoard, capturedPos.row, capturedPos.col, null);
    }
  }

  // Check for king promotion
  if (piece.color === 'red' && move.to.row === 7) {
    const newPiece = getPiece(newBoard, move.to.row, move.to.col);
    if (newPiece) {
      newPiece.type = 'king';
    }
  }
  if (piece.color === 'black' && move.to.row === 0) {
    const newPiece = getPiece(newBoard, move.to.row, move.to.col);
    if (newPiece) {
      newPiece.type = 'king';
    }
  }

  return newBoard;
}

export function countPieces(board: Board, color: 'red' | 'black'): number {
  let count = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPiece(board, row, col);
      if (piece && piece.color === color) {
        count++;
      }
    }
  }
  return count;
}

export function hasValidMoves(board: Board, color: PieceColor): boolean {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPiece(board, row, col);
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, { row, col }, color);
        if (moves.length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

export function getGameStatus(board: Board): 'active' | 'redWon' | 'blackWon' | 'draw' {
  const redCount = countPieces(board, 'red');
  const blackCount = countPieces(board, 'black');

  if (redCount === 0) return 'blackWon';
  if (blackCount === 0) return 'redWon';

  if (!hasValidMoves(board, 'red')) return 'blackWon';
  if (!hasValidMoves(board, 'black')) return 'redWon';

  return 'active';
}
