export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[][];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameSettings {
    boardSize: number;
}

export interface GameState {
    board: BoardState;
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
    status: GameStatus;
    moveCount: number;
    winningCells: [number, number][];
    settings: GameSettings;
}

export interface GameResult {
    winner: Player | null;
    isDraw: boolean;
    finalBoard: BoardState;
    date: string;
    moves: number;
    settings: GameSettings;
}

export interface PlayerStats {
    wins: number;
    losses: number;
    draws: number;
    totalMoves: number;
}

export interface GameStats {
    totalGames: number;
    xWins: number;
    oWins: number;
    draws: number;
    xWinPercentage: string;
    oWinPercentage: string;
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
    onResetStats?: () => void;
    onSettingsOpen?: () => void;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface CellProps {
    value: CellValue;
    row: number;
    col: number;
    onClick: (row: number, col: number) => void;
    isWinningCell?: boolean;
    disabled?: boolean;
}