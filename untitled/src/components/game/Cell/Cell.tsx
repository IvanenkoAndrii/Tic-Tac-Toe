import React from 'react';
import styles from './Cell.module.css';
import { CellProps } from '../../../types/game.types';

const Cell: React.FC<CellProps> = ({
                                       value,
                                       row,
                                       col,
                                       onClick,
                                       isWinningCell = false
                                   }) => {
    const handleClick = () => {
        onClick(row, col);
    };

    const cellClasses = [
        styles.cell,
        value ? styles[value.toLowerCase()] : '',
        isWinningCell ? styles.winning : '',
    ].join(' ').trim();

    const getAriaLabel = () => {
        if (value) {
            return `Клітинка ${row + 1},${col + 1} містить ${value}`;
        }
        return `Порожня клітинка ${row + 1},${col + 1}, натисніть щоб зробити хід`;
    };

    return (
        <button
            className={cellClasses}
            onClick={handleClick}
            aria-label={getAriaLabel()}
            disabled={!!value}
            data-row={row}
            data-col={col}
        >
            {value && (
                <span className={styles.symbol}>
          {value}
        </span>
            )}
        </button>
    );
};

export default Cell;