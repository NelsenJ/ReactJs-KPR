import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calc.css";
import Footer from "../components/items/footer";
import 'boxicons';
import QuestionImg from "../components/items/questionImg";
import QuestionRp from "../components/items/question-Rp";
import QuestionOpt from "../components/items/questionOpt";
import QuestionPerc from "../components/items/question-Perc";
import QuestionYear from "../components/items/question-Year";
import Quote from "../components/items/quote";

export default function Calculator() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [targetAmount, setTargetAmount] = useState("");
    const [timeHorizon, setTimeHorizon] = useState("");
    const [initialAmount, setInitialAmount] = useState("");
    const [annualInvestmentTarget, setAnnualInvestmentTarget] = useState("");
    const [expectedReturn, setExpectedReturn] = useState("");
    const [investmentDuration, setInvestmentDuration] = useState("");
    const [contributionFrequency, setContributionFrequency] = useState("Tahun");
    const [contributionTiming, setContributionTiming] = useState("Awal Tahun");
    const [showResult, setShowResult] = useState(false);
    
    const [showSteps, setShowSteps] = useState({
        step1: true, 
        boxOne: false, 
        step2: false, 
        boxTwo: false, 
        step3: false, 
        boxThree: false, 
        step4: false, 
        boxFour: false, 
        step5: false, 
        boxFive: false,
        step6: false,
        completed: false
    });

    const navigate = useNavigate();

    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', !isDarkMode);
        document.body.classList.toggle('light-mode');
    };

    const handleClickBack = () => {
        navigate('/');
    };

    const checkCompletion = () => {
        const allStepsCompleted = targetAmount && timeHorizon && initialAmount && 
                                  contributionFrequency && contributionTiming && 
                                  annualInvestmentTarget && expectedReturn && investmentDuration;
        setShowSteps(prev => ({ ...prev, completed: Boolean(allStepsCompleted) }));
        setShowResult(Boolean(allStepsCompleted));
    };

    useEffect(() => {
        checkCompletion();
    }, [targetAmount, timeHorizon, initialAmount, contributionFrequency, contributionTiming, annualInvestmentTarget, expectedReturn, investmentDuration]);

    const handleTargetAmountChange = (value) => {
        setTargetAmount(Number(value));
        setShowSteps((prev) => ({ ...prev, boxOne: true, step2: true }));
    };

    const handleTimeHorizonChange = (value) => {
        setTimeHorizon(Number(value));
        setShowSteps((prev) => ({ ...prev, boxTwo: true, step3: true }));
    };

    const handleInitialAmountChange = (value) => {
        setInitialAmount(Number(value));
        setShowSteps((prev) => ({ ...prev, boxThree: true, step4: true }));
    };

    const handleContributionFrequencyChange = (value) => {
        setContributionFrequency(value);
        setShowSteps((prev) => ({ ...prev, boxFour: true, step5: true }));
    };

    const handleContributionTimingChange = (value) => {
        setContributionTiming(value);
        setShowSteps((prev) => ({ ...prev, boxFive: true, step6: true }));
    };

    const handleAnnualInvestmentTargetChange = (value) => {
        setAnnualInvestmentTarget(Number(value));
    };

    const handleExpectedReturnChange = (value) => {
        setExpectedReturn(Number(value));
    };

    const handleInvestmentDurationChange = (value) => {
        setInvestmentDuration(Number(value));
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    return (
        <>
            <div className="header hed">
                <div className="header-flex">
                    <span onClick={handleClickBack}>
                        <box-icon name='arrow-back'></box-icon>
                    </span>
                    <h1 className="header-title">🏚️ Kalkulator Investasi</h1>
                    <p className="header-dark-mode" onClick={handleToggleDarkMode}>
                        {isDarkMode ? '☀️' : '🌙'}
                    </p>
                </div>
            </div>

            <div className="content">
                <Quote />

                {showSteps.step1 && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                        text="Yuk, ceritain mimpimu."
                    />
                )}

                {showSteps.step1 && (
                    <QuestionRp
                        title="Jumlah uang yang ingin kamu capai"
                        onValueChange={handleTargetAmountChange}
                    />
                )}

                {showSteps.boxOne && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-2.webp"
                        text="Thank You!"
                        text2="Next, ayo atur strategi investasi kamu!"
                    />
                )}

                {showSteps.step2 && (
                    <QuestionYear 
                        title="Waktu mengumpulkan uang ini"
                        onValueChange={handleTimeHorizonChange}
                    />
                )}

                {showSteps.boxTwo && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-4.webp"
                        text="Mari kita lanjutkan!"
                        text2="Selanjutnya, isi berapa uang yang sudah kamu miliki."
                    />
                )}

                {showSteps.step3 && (
                    <QuestionRp
                        title="Uang yang kamu miliki saat ini sebesar"
                        onValueChange={handleInitialAmountChange}
                    />
                )}

                {showSteps.step4 && (
                    <QuestionOpt
                        title="Kamu akan menabung setiap"
                        options={[
                            { label: "Tahun", value: "Tahun" },
                            { label: "Bulan", value: "Bulan" },
                        ]}
                        onValueChange={handleContributionFrequencyChange}
                    />
                )}

                {showSteps.step5 && (
                    <QuestionOpt
                        title="Kamu akan menambahkan dana pada"
                        options={[
                            { label: "Awal Tahun", value: "Awal Tahun" },
                            { label: "Akhir Tahun", value: "Akhir Tahun" },
                        ]}
                        onValueChange={handleContributionTimingChange}
                    />
                )}
                
                {showSteps.step6 && (
                    <QuestionRp
                        title="Target investasimu tiap tahun sebesar"
                        onValueChange={handleAnnualInvestmentTargetChange}
                    />
                )}

                {showSteps.completed && (
                    <div className="hasil">
                        <div>
                            <p>Strategi investasimu sudah siap!</p>
                            <p>Ayo lihat hasil strategimu di bawah ini.</p>
                        </div>
                        <button onClick={() => setShowResult(true)}>
                            <box-icon name='chevron-right' color="#FFFFFF"></box-icon> Lihat Hasil
                        </button>
                    </div>
                )}

                {showResult && (
                    <div className="result-summary animate-slide-down">
                        <div className="result-summary-header">
                            <span onClick={() => setShowResult(false)} className="close-result-summary">
                                <box-icon name='x'></box-icon>
                            </span>
                        </div>
                        <h1>Hasil Strategi Investasimu</h1>
                        <p>Dengan return {expectedReturn}% per tahun dan investasi rutin sebesar {formatCurrency(annualInvestmentTarget)}, kamu bisa mencapai target investasi senilai {formatCurrency(targetAmount)} dalam {investmentDuration} tahun.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
