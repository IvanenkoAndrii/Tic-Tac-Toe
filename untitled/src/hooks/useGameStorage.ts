import { useState, useEffect, useCallback } from 'react';
import { GameResult, GameStats } from '../types/game.types';

const STORAGE_KEY = 'tic-tac-toe-game-history';

export const useGameStorage = () => {
    const [gameHistory, setGameHistory] = useState<GameResult[]>(() => {
        try {
            const savedHistory = localStorage.getItem(STORAGE_KEY);
            return savedHistory ? JSON.parse(savedHistory) as GameResult[] : [];
        } catch {
            console.error('Помилка завантаження історії ігор');
            return [];
        }
    });

    const [gameStats, setGameStats] = useState<GameStats>(() => {
        try {
            const savedHistory = localStorage.getItem(STORAGE_KEY);
            const history = savedHistory ? JSON.parse(savedHistory) as GameResult[] : [];
            return calculateStats(history);
        } catch {
            console.error('Помилка завантаження статистики');
            return {
                totalGames: 0,
                xWins: 0,
                oWins: 0,
                draws: 0,
                xWinPercentage: '0',
                oWinPercentage: '0',
            };
        }
    });

    const calculateStats = useCallback((history: GameResult[]): GameStats => {
        const totalGames = history.length;
        const xWins = history.filter((game) => game.winner === 'X').length;
        const oWins = history.filter((game) => game.winner === 'O').length;
        const draws = history.filter((game) => game.isDraw).length;

        return {
            totalGames,
            xWins,
            oWins,
            draws,
            xWinPercentage: totalGames > 0 ? ((xWins / totalGames) * 100).toFixed(1) : '0',
            oWinPercentage: totalGames > 0 ? ((oWins / totalGames) * 100).toFixed(1) : '0',
        };
    }, []);

    const updateStats = useCallback((history: GameResult[]) => {
        setGameStats(calculateStats(history));
    }, [calculateStats]);

    useEffect(() => {
        updateStats(gameHistory);
    }, [gameHistory, updateStats]);

    const saveGameResult = useCallback((result: GameResult) => {
        try {
            const updatedHistory = [...gameHistory, result];
            setGameHistory(updatedHistory);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
            updateStats(updatedHistory);
        } catch (error) {
            console.error('Помилка збереження результату гри:', error);
        }
    }, [gameHistory, updateStats]);

    const clearGameHistory = useCallback(() => {
        try {
            setGameHistory([]);
            localStorage.removeItem(STORAGE_KEY);
            updateStats([]);
        } catch (error) {
            console.error('Помилка очищення історії:', error);
        }
    }, [updateStats]);

    const getStats = useCallback((): GameStats => {
        return gameStats;
    }, [gameStats]);

    return {
        gameHistory,
        gameStats,
        saveGameResult,
        clearGameHistory,
        getStats,
    };
};