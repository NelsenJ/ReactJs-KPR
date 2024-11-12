const QuestionBox = ({ title, text, color, animationClass = "animate-slide-down" }) => {
    return (
        <div className={`questionBox ${animationClass}`}>
            <div className="question-title">
                <p>•</p>
                <p>{title}</p>
            </div>
            <div className="input-container">
                <div className="vertical-line"></div>
                <div className="text sigmatext" style={{backgroundColor: color}}>{text}</div>
            </div>
        </div>
    );
};

export default QuestionBox;