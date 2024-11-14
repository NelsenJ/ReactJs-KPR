const QuestionImg = ({ imgSrc, text, text2, animationClass = "animate-slide-down" }) => {
    return (
        <div className={`questionImg1 ${animationClass}`}>
            <img src={imgSrc} alt="avatar" />
            <div className="chat-container">
                <div className="chat-box">
                    <p>{text}</p>
                    <div className="design-questionImg"></div>
                </div>
                {text2 && (
                    <div className="chat-box">
                        <p>{text2}</p>
                        <div className="design-questionImg"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionImg;