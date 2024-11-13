import { useState, useEffect } from "react";
import "./index.css";

export default function Quote() {
    const [quote, setQuote] = useState("");

    const fetchRandomQuote = async () => {
        try {
            const response = await fetch('/quotes.json');
            if (!response.ok) {
                throw new Error("Failed to fetch quotes");
            }
            const quotes = await response.json();
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        } catch (error) {
            console.error("Failed to load quotes", error);
            setQuote("This is a default fallback quote.");
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <div className="quotes animate-slide-right">
            <p><box-icon type="solid" name="quote-alt-left" color="#808B9C"></box-icon> {quote}</p>
        </div>
    );
}
