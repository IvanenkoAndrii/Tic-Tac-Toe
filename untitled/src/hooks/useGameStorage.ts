import { useState, useEffect } from 'react';
import { GameResult } from '../types/game.types';

const STORAGE_KEY = 'tic-tac-toe-game-history';

export const useGameStorage = () => {
    const [gameHistory, setGameHistory] = useState<GameResult[]>([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem(STORAGE_KEY);
        if (savedHistory) {
            try {
                setGameHistory(JSON.parse(savedHistory));
            } catch (error) {
                console.error('Помилка завантаження історії:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const saveGameResult = (result: GameResult) => {
        const updatedHistory = [...gameHistory, result];
        setGameHistory(updatedHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    };

    const clearGameHistory = () => {
        setGameHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const getStats = () => {
        const totalGames = gameHistory.length;
        const xWins = gameHistory.filter(game => game.winner === 'X').length;
        const oWins = gameHistory.filter(game => game.winner === 'O').length;
        const draws = gameHistory.filter(game => game.isDraw).length;

        return {
            totalGames,
            xWins,
            oWins,
            draws,
            xWinPercentage: totalGames > 0 ? (xWins / totalGames * 100).toFixed(1) : '0',
            oWinPercentage: totalGames > 0 ? (oWins / totalGames * 100).toFixed(1) : '0',
        };
    };

    return {
        gameHistory,
        saveGameResult,
        clearGameHistory,
        getStats,
    };
};