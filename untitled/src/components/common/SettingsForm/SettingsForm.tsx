import React from 'react';
import { useForm } from 'react-hook-form';
import { GameSettings } from '../../../types/game.types';
import { Button } from '../Button';
import styles from './SettingsForm.module.css';

interface SettingsFormProps {
    initialSettings: GameSettings;
    onSubmit: (settings: GameSettings) => void;
    onCancel: () => void;
    onResetToDefault: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
                                                       initialSettings,
                                                       onSubmit,
                                                       onCancel,
                                                       onResetToDefault
                                                   }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<GameSettings>({
        defaultValues: initialSettings,
    });

    const handleFormSubmit = (data: GameSettings) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.settingsForm}>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Розмір поля</label>
                <select
                    className={styles.selectControl}
                    {...register('boardSize', {
                        required: 'Оберіть розмір поля',
                        valueAsNumber: true
                    })}
                >
                    <option value={3}>3×3 (Класичний)</option>
                    <option value={4}>4×4 (Середній)</option>
                    <option value={5}>5×5 (Важкий)</option>
                </select>
                {errors.boardSize && (
                    <span className={styles.errorMessage}>{errors.boardSize.message}</span>
                )}
                <p className={styles.settingDescription}>
                    Зміна розміру поля вплине на наступну гру.
                </p>
            </div>

            <div className={styles.formActions}>
                <Button
                    type="submit"
                    variant="primary"
                    onClick={() => {}}
                >
                    Зберегти
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Скасувати
                </Button>
                <Button
                    type="button"
                    variant="danger"
                    onClick={onResetToDefault}
                >
                    Скинути до стандартних
                </Button>
            </div>
        </form>
    );
};

export default SettingsForm;