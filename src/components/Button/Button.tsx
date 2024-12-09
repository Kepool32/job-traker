import React from 'react';
import styles from './Button.module.scss'; // Импортируем стили как модуль

interface ButtonProps {
    onClick: () => void;
    color?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, color = 'primary', type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${color === 'primary' ? styles.primary : styles.secondary}`}
        >
            <span className={styles.icon}>+</span>
        </button>
    );
};

export default Button;
