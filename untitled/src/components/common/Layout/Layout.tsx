import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <div className="container">
                    <p className={styles.footerText}>
                        Каркас гри "Хрестики-Нулики" - Лабораторна робота №1 | 3-й курс
                    </p>
                    <p className={styles.footerSubtext}>
                        React + TypeScript + CSS Modules
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;