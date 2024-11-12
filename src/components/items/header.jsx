// components/Header.jsx
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className="header">
            <div className="header-flex">
                <h1 className="header-title">Menghitung Mimpi</h1>
                <p className="header-dark-mode" onClick={toggleDarkMode}>
                    {isDarkMode ? '☀️' : '🌙'}
                </p>
            </div>
        </div>
    );
}