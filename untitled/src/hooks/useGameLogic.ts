import { useState, useCallback, useEffect } from 'react';
import {
    GameState,
    BoardState,
    Player,
    GameResult,
    PlayerStats,
    GameSettings
} from '../types/game.types';

const WINNING_COMBINATIONS_3x3 = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
];

const DEFAULT_SETTINGS: GameSettings = {
    boardSize: 3,
};

const PLAYER_STATS_STORAGE_KEY = 'tic-tac-toe-player-stats';

type PlayersStats = {
    X: PlayerStats;
    O: PlayerStats;
};

export const useGameLogic = (settings: GameSettings = DEFAULT_SETTINGS) => {
    const createInitialBoard = (size: number): BoardState => {
        return Array(size).fill(null).map(() => Array(size).fill(null));
    };

    const getWinningCombinations = (size: number): number[][][] => {
        if (size === 3) return WINNING_COMBINATIONS_3x3;

        const combinations: number[][][] = [];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - 3; j++) {
                combinations.push([
                    [i, j], [i, j + 1], [i, j + 2]
                ]);
            }
        }

        for (let i = 0; i <= size - 3; i++) {
            for (let j = 0; j < size; j++) {
                combinations.push([
                    [i, j], [i + 1, j], [i + 2, j]
                ]);
            }
        }

        for (let i = 0; i <= size - 3; i++) {
            for (let j = 0; j <= size - 3; j++) {
                combinations.push([
                    [i, j], [i + 1, j + 1], [i + 2, j + 2]
                ]);
            }
        }

        for (let i = 0; i <= size - 3; i++) {
            for (let j = 2; j < size; j++) {
                combinations.push([
                    [i, j], [i + 1, j - 1], [i + 2, j - 2]
                ]);
            }
        }

        return combinations;
    };

    const [gameState, setGameState] = useState<GameState>(() => ({
        board: createInitialBoard(settings.boardSize),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        status: 'playing',
        moveCount: 0,
        winningCells: [],
        settings,
    }));

    const [playerStats, setPlayerStats] = useState<PlayersStats>(() => {
        const savedStats = localStorage.getItem(PLAYER_STATS_STORAGE_KEY);
        if (savedStats) {
            try {
                return JSON.parse(savedStats);
            } catch {
                console.error('Помилка завантаження статистики гравців');
            }
        }
        return {
            X: { wins: 0, losses: 0, draws: 0, totalMoves: 0 },
            O: { wins: 0, losses: 0, draws: 0, totalMoves: 0 },
        };
    });

    useEffect(() => {
        localStorage.setItem(PLAYER_STATS_STORAGE_KEY, JSON.stringify(playerStats));
    }, [playerStats]);

    useEffect(() => {
        restartGame();
    }, [settings.boardSize]);

    const checkWinner = useCallback((board: BoardState, row: number, col: number, player: Player): [Player | null, [number, number][]] => {
        const size = board.length;
        const combinations = getWinningCombinations(size);

        for (const combination of combinations) {
            const [[r1, c1], [r2, c2], [r3, c3]] = combination;

            if (board[r1][c1] === player &&
                board[r2][c2] === player &&
                board[r3][c3] === player) {
                return [player, [[r1, c1], [r2, c2], [r3, c3]]];
            }
        }
        return [null, []];
    }, []);

    const checkDraw = useCallback((board: BoardState): boolean => {
        return board.every(row => row.every(cell => cell !== null));
    }, []);

    const makeMove = useCallback((row: number, col: number) => {
        setGameState(prev => {
            if (prev.board[row][col] !== null || prev.winner || prev.isDraw) {
                return prev;
            }

            const newBoard = prev.board.map(r => [...r]);
            newBoard[row][col] = prev.currentPlayer;

            const [winner, winningCells] = checkWinner(newBoard, row, col, prev.currentPlayer);
            const isDraw = !winner && checkDraw(newBoard);

            if (winner || isDraw) {
                setPlayerStats((prevStats: PlayersStats) => {
                    const newStats = { ...prevStats };

                    if (winner) {
                        newStats[winner].wins += 1;
                        newStats[winner === 'X' ? 'O' : 'X'].losses += 1;
                    } else if (isDraw) {
                        newStats.X.draws += 1;
                        newStats.O.draws += 1;
                    }

                    newStats.X.totalMoves += prev.currentPlayer === 'X' ? 1 : 0;
                    newStats.O.totalMoves += prev.currentPlayer === 'O' ? 1 : 0;

                    return newStats;
                });
            }

            return {
                ...prev,
                board: newBoard,
                currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
                winner,
                isDraw,
                status: winner ? 'won' : isDraw ? 'draw' : 'playing',
                moveCount: prev.moveCount + 1,
                winningCells,
                settings: prev.settings,
            };
        });
    }, [checkWinner, checkDraw]);

    const restartGame = useCallback(() => {
        setGameState({
            board: createInitialBoard(settings.boardSize),
            currentPlayer: 'X',
            winner: null,
            isDraw: false,
            status: 'playing',
            moveCount: 0,
            winningCells: [],
            settings,
        });
    }, [settings]);

    const resetStats = useCallback(() => {
        const emptyStats: PlayersStats = {
            X: { wins: 0, losses: 0, draws: 0, totalMoves: 0 },
            O: { wins: 0, losses: 0, draws: 0, totalMoves: 0 },
        };
        setPlayerStats(emptyStats);
        localStorage.setItem(PLAYER_STATS_STORAGE_KEY, JSON.stringify(emptyStats));
        restartGame();
    }, [restartGame]);

    const getGameResult = useCallback((): GameResult => {
        return {
            winner: gameState.winner,
            isDraw: gameState.isDraw,
            finalBoard: gameState.board,
            date: new Date().toISOString(),
            moves: gameState.moveCount,
            settings: gameState.settings,
        };
    }, [gameState]);

    return {
        gameState,
        playerStats,
        makeMove,
        restartGame,
        resetStats,
        getGameResult,
    };
};