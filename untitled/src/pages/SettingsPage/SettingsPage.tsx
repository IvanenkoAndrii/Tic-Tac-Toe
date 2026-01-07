import React, { useState } from 'react';
import { useGameSettings } from '../../hooks/useGameSettings';
import { Button } from '../../components';
import styles from './SettingsPage.module.css';

interface SettingsPageProps {
    onReturn: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onReturn }) => {
    const { settings, saveSettings } = useGameSettings();
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSave = () => {
        saveSettings(localSettings);
        onReturn();
    };

    const handleReset = () => {
        setLocalSettings({
            boardSize: 3,
        });
    };

    return (
        <div className={styles.settingsPage}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onReturn}>
                    ← Назад
                </button>
                <h1 className={styles.title}>Налаштування гри</h1>
            </div>

            <div className={styles.settingsContainer}>
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>Розмір поля:</label>
                    <select
                        className={styles.settingSelect}
                        value={localSettings.boardSize}
                        onChange={(e) => setLocalSettings({
                            ...localSettings,
                            boardSize: parseInt(e.target.value)
                        })}
                    >
                        <option value={3}>3×3 (Класичний)</option>
                        <option value={4}>4×4 (Середній)</option>
                        <option value={5}>5×5 (Важкий)</option>
                    </select>
                    <p className={styles.settingDescription}>
                        Зміна розміру поля вплине на наступну гру.
                    </p>
                </div>

                <div className={styles.currentSettings}>
                    <h3>Поточні налаштування:</h3>
                    <p>Розмір поля: <strong>{localSettings.boardSize}×{localSettings.boardSize}</strong></p>
                </div>
            </div>

            <div className={styles.actions}>
                <Button variant="primary" onClick={handleSave}>
                    Зберегти
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                    Скинути до стандартних
                </Button>
                <Button variant="danger" onClick={onReturn}>
                    Скасувати
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;