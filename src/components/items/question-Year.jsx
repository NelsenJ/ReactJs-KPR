const QuestionYear = ({ title, onValueChange, animationClass = "animate-slide-right" }) => {
    return (
        <div className={`question-Year ${animationClass}`}>
            <div className="question-title">
                <p>•</p>
                <p>{title}</p>
            </div>
            <div className="input-container">
                <div className="vertical-line"></div>
                <div className="input-group">
                    <input 
                        type="number" 
                        onChange={(e) => onValueChange(Number(e.target.value))}
                    />
                    <hr />
                </div>
                <p className="percent sigmatext">Tahun</p>
                <div className="underscore"></div>
            </div>
        </div>
    );
};
export default QuestionYear;