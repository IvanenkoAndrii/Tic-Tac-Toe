export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[][];

export interface GameState {
    board: BoardState;
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
    moveCount: number;
}

export interface GameResult {
    winner: Player | null;
    isDraw: boolean;
    finalBoard: BoardState;
    date: string;
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