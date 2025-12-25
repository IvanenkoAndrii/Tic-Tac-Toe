export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[][];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
    board: BoardState;
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
    status: GameStatus;
    moveCount: number;
    winningCells: [number, number][];
}

export interface GameHistoryItem {
    board: BoardState;
    player: Player;
    position: [number, number];
    moveNumber: number;
}

export interface GameResult {
    winner: Player | null;
    isDraw: boolean;
    finalBoard: BoardState;
    date: string;
    moves: number;
}

export interface PlayerStats {
    wins: number;
    losses: number;
    draws: number;
    totalMoves: number;
}

export interface GameInfoProps {
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
    moveCount: number;
    playerStats: {
        X: PlayerStats;
        O: PlayerStats;
    };
    onRestart: () => void;
    onReset?: () => void;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

export interface CellProps {
    value: CellValue;
    row: number;
    col: number;
    onClick: (row: number, col: number) => void;
    isWinningCell?: boolean;
}