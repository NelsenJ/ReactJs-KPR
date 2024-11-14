// components/items/container.jsx
import { useTheme } from '../contexts/ThemeContext';

export default function Container({ children }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`main-container ${isDarkMode ? 'dark' : 'light'}`}>
      {children}
    </div>
  );
}