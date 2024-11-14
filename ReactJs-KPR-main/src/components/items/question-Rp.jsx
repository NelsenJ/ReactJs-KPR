const QuestionRp = ({ title, onValueChange, animationClass = "animate-slide-right" }) => {
    return (
        <div className={`question-Rp ${animationClass}`}>
            <div className="question-title">
                <p>•</p>
                <p>{title}</p>
            </div>
            <div className="input-container">
                <div className="vertical-line"></div>
                <p className="sigmatext">Rp</p>
                <div className="input-group">
                    <input 
                        type="number" 
                        onChange={(e) => onValueChange(Number(e.target.value))}
                    />
                    <hr />
                </div>
                <div className="underscore"></div>
            </div>
        </div>
    );
};

export default QuestionRp;