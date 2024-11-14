import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <>
            <div className="footer">
                <p>
                    © 2021 - 2024
                    <a href="//instagram.com/feliciaputritjiasaka" className="underline">Felicia Putri Tjiasaka</a>
                    <span>. All Right
                    Reserved.
                    </span>
                </p>
                <div className="social-media">
                    <box-icon 
                        name="youtube" 
                        type="logo" 
                        animation="tada" 
                        color={isDarkMode ? "#FFFFFF" : "#000000"} 
                    ></box-icon>
                    <box-icon 
                        name="instagram" 
                        type="logo" 
                        animation="tada" 
                        color={isDarkMode ? "#FFFFFF" : "#000000"} 
                    ></box-icon>
                    <box-icon 
                        name="tiktok" 
                        type="logo" 
                        animation="tada" 
                        color={isDarkMode ? "#FFFFFF" : "#000000"} 
                    ></box-icon>

                </div>
            </div>     
        </>
    )
}