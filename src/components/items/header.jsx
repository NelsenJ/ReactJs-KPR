// components/Header.jsx
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className="header">
            <div className="header-flex">
                <h1 className="header-title">Menghitung Mimpi</h1>
                <p className="header-dark-mode" onClick={toggleDarkMode}>
                {isDarkMode ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="32"
                        height="32"
                        >
                        <circle cx="32" cy="32" r="10" fill="#fff" />
                        <circle cx="36" cy="28" r="7" fill="#1E293B" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="32"
                            height="32"
                        >
                            <circle cx="32" cy="32" r="4" fill="#000" />
                            <line x1="32" y1="20" x2="32" y2="24" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="32" y1="40" x2="32" y2="44" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="20" y1="32" x2="24" y2="32" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="40" y1="32" x2="44" y2="32" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="23" y1="23" x2="26" y2="26" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="38" y1="38" x2="41" y2="41" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="23" y1="41" x2="26" y2="38" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="41" y1="23" x2="38" y2="26" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                        </svg>
                    )}
                </p>
            </div>
        </div>
    );
}