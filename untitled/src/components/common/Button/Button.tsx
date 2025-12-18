import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from '../../../types/game.types';

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           variant = 'primary',
                                           size = 'medium',
                                           disabled = false,
                                       }) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        disabled ? styles.disabled : '',
    ].join(' ');

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;