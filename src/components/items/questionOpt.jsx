import React from "react";

const QuestionOpt = ({ title, options, onValueChange, animationClass = "animate-slide-right" }) => {
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
                            onClick={() => onValueChange(option.value)} 
                            className="option-button"
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
