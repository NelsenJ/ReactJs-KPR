const Question1 = ({ title, onValueChange, animationClass = "animate-slide-right" }) => {
    return (
        <div className={`question1 ${animationClass}`}>
            <div className="question-title">
                <p>•</p>
                <p>{title}</p>
            </div>
            <div className="input-container">
                <div className="vertical-line"></div>
                <p>Rp</p>
                <input 
                    type="number" 
                    onChange={(e) => onValueChange(Number(e.target.value))}
                />
                <div className="underscore"></div>
            </div>
        </div>
    );
};

export default Question1;