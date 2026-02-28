export type PieceColor = 'red' | 'black';
export type PieceType = 'regular' | 'king';

export interface Piece {
  color: PieceColor;
  type: PieceType;
}

export interface Square {
  piece: Piece | null;
}

export interface Board {
  squares: (Square | null)[][];
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  captures?: Position[];
}

export interface GameState {
  board: Board;
  currentPlayer: PieceColor;
  selectedPiece: Position | null;
  validMoves: Move[];
  capturedRed: number;
  capturedBlack: number;
  gameStatus: 'active' | 'redWon' | 'blackWon' | 'draw';
  moveHistory: Move[];
}

export interface AIConfig {
  enabled: boolean;
  difficulty: 'easy' | 'medium';
}
