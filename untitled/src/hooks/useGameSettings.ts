import { useState, useEffect } from 'react';
import { GameSettings } from '../types/game.types';

const SETTINGS_STORAGE_KEY = 'tic-tac-toe-settings';

const DEFAULT_SETTINGS: GameSettings = {
    boardSize: 3,
};

export const useGameSettings = () => {
    const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                setSettings({
                    boardSize: parsedSettings.boardSize || DEFAULT_SETTINGS.boardSize,
                });
            } catch {
                console.error('Помилка завантаження налаштувань');
                localStorage.removeItem(SETTINGS_STORAGE_KEY);
            }
        }
        setIsInitialized(true);
    }, []);

    const saveSettings = (newSettings: GameSettings) => {
        setSettings(newSettings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    };

    return {
        settings,
        saveSettings,
        resetSettings,
        isInitialized,
    };
};