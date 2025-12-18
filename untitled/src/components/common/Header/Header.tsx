import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <div className={styles.logoContainer}>
                        <h1 className={styles.logo}>Хрестики-Нулики</h1>
                        <span className={styles.subLogo}>Лабораторна №1</span>
                    </div>
                    <nav className={styles.nav}>
                        <span className={styles.navItem}>3-й курс</span>
                        <span className={styles.navItem}>React + TypeScript</span>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;