import { useState, useCallback } from 'react';
import {
    GameState,
    BoardState,
    Player,
    GameHistoryItem,
    GameResult,
    PlayerStats
} from '../types/game.types';

const INITIAL_BOARD: BoardState = Array(3).fill(null).map(() => Array(3).fill(null));

const WINNING_COMBINATIONS = [

    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
];

export const useGameLogic = () => {
    const [gameState, setGameState] = useState<GameState>({
        board: INITIAL_BOARD,
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        status: 'playing',
        moveCount: 0,
        winningCells: [],
    });

    const [history, setHistory] = useState<GameHistoryItem[]>([]);
    const [playerStats, setPlayerStats] = useState({
        X: { wins: 0, losses: 0, draws: 0, totalMoves: 0 } as PlayerStats,
        O: { wins: 0, losses: 0, draws: 0, totalMoves: 0 } as PlayerStats,
    });

    const checkWinner = useCallback((board: BoardState, row: number, col: number, player: Player): [Player | null, [number, number][]] => {
        for (const combination of WINNING_COMBINATIONS) {
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

            const historyItem: GameHistoryItem = {
                board: JSON.parse(JSON.stringify(newBoard)),
                player: prev.currentPlayer,
                position: [row, col],
                moveNumber: prev.moveCount + 1,
            };

            setHistory(prevHistory => [...prevHistory, historyItem]);

            if (winner || isDraw) {
                setPlayerStats(prevStats => {
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
            };
        });
    }, [checkWinner, checkDraw]);

    const restartGame = useCallback(() => {
        setGameState({
            board: INITIAL_BOARD,
            currentPlayer: 'X',
            winner: null,
            isDraw: false,
            status: 'playing',
            moveCount: 0,
            winningCells: [],
        });
        setHistory([]);
    }, []);

    const resetStats = useCallback(() => {
        setPlayerStats({
            X: { wins: 0, losses: 0, draws: 0, totalMoves: 0 } as PlayerStats,
            O: { wins: 0, losses: 0, draws: 0, totalMoves: 0 } as PlayerStats,
        });
        restartGame();
    }, [restartGame]);

    const getGameResult = useCallback((): GameResult => {
        return {
            winner: gameState.winner,
            isDraw: gameState.isDraw,
            finalBoard: gameState.board,
            date: new Date().toISOString(),
            moves: gameState.moveCount,
        };
    }, [gameState]);

    return {
        gameState,
        history,
        playerStats,
        makeMove,
        restartGame,
        resetStats,
        getGameResult,
    };
};