import React, { useState } from "react";

const QuestionOpt = ({ title, options, onValueChange, animationClass = "animate-slide-right" }) => {
    // State to keep track of the selected option
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (value) => {
        setSelectedOption(value); // Set the clicked option as selected
        onValueChange(value); // Call the parent callback
    };

    return (
        <div className={`question-opt ${animationClass}`}>
            <div className="question-title">
                <p>•</p>
                <p>{title}</p>
            </div>
            <div className="option-container">
                <div className="vertical-line"></div>
                <div className="option-buttons">
                    {options.map((option) => (
                        <button 
                            key={option.value} 
                            onClick={() => handleOptionClick(option.value)} 
                            className={`option-button ${selectedOption === option.value ? 'active' : ''}`} // Add active class when selected
                            style={{
                                backgroundColor: selectedOption === option.value ? 'rgb(164 202 254)' : 'rgb(51 65 85);', // Change background color when active
                                color: 'white',
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionOpt;
