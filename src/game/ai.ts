import { Board, Move, PieceColor, Position } from './types';
import { copyBoard, getPiece, isPlayableSquare } from './board';
import { getValidMoves, applyMove, countPieces } from './gameLogic';

export function getBestMove(board: Board, color: PieceColor, difficulty: 'easy' | 'medium'): Move | null {
  const depth = difficulty === 'easy' ? 2 : 4;
  const allMoves = getAllMoves(board, color);

  if (allMoves.length === 0) return null;

  let bestMove = allMoves[0];
  let bestScore = -Infinity;

  for (const move of allMoves) {
    const newBoard = applyMove(board, move);
    const score = minimax(newBoard, depth - 1, false, color);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

function minimax(board: Board, depth: number, isMaximizing: boolean, aiColor: PieceColor): number {
  if (depth === 0) {
    return evaluateBoard(board, aiColor);
  }

  const currentColor = isMaximizing ? aiColor : aiColor === 'red' ? 'black' : 'red';
  const allMoves = getAllMoves(board, currentColor);

  if (allMoves.length === 0) {
    // No valid moves - opponent wins
    return isMaximizing ? -1000 : 1000;
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of allMoves) {
      const newBoard = applyMove(board, move);
      const score = minimax(newBoard, depth - 1, false, aiColor);
      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of allMoves) {
      const newBoard = applyMove(board, move);
      const score = minimax(newBoard, depth - 1, true, aiColor);
      minScore = Math.min(minScore, score);
    }
    return minScore;
  }
}

function evaluateBoard(board: Board, aiColor: PieceColor): number {
  const opponentColor = aiColor === 'red' ? 'black' : 'red';

  const aiPieces = countPieces(board, aiColor);
  const opponentPieces = countPieces(board, opponentColor);

  let aiKings = 0;
  let opponentKings = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPiece(board, row, col);
      if (piece) {
        if (piece.color === aiColor && piece.type === 'king') aiKings++;
        if (piece.color === opponentColor && piece.type === 'king') opponentKings++;
      }
    }
  }

  // Score: piece count (1 point each) + king bonus (0.5 points each)
  const score = (aiPieces + aiKings * 0.5) - (opponentPieces + opponentKings * 0.5);
  return score;
}

function getAllMoves(board: Board, color: PieceColor): Move[] {
  const moves: Move[] = [];

  // First check for captures (they're mandatory)
  const captures: Move[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPiece(board, row, col);
      if (piece && piece.color === color && isPlayableSquare(row, col)) {
        const pieceMoves = getValidMoves(board, { row, col }, color);
        const pieceCapturesMoves = pieceMoves.filter(m => m.captures && m.captures.length > 0);
        captures.push(...pieceCapturesMoves);
      }
    }
  }

  // If there are any captures required, return only captures
  if (captures.length > 0) {
    return captures;
  }

  // Otherwise return all regular moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPiece(board, row, col);
      if (piece && piece.color === color && isPlayableSquare(row, col)) {
        const pieceMoves = getValidMoves(board, { row, col }, color);
        moves.push(...pieceMoves);
      }
    }
  }

  return moves;
}
