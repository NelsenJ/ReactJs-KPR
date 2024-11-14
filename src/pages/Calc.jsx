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
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
        completed: false
    });

    const navigate = useNavigate();

    const handleToggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.body.classList.toggle('light-mode');
    };

    const handleClickBack = () => {
        navigate('/');
    };

    const checkCompletion = () => {
        const allStepsCompleted = 
            targetAmount && timeHorizon && initialAmount && 
            contributionFrequency && contributionTiming && 
            annualInvestmentTarget;
        
        setShowSteps(prev => ({ ...prev, completed: Boolean(allStepsCompleted) }));
        
        if (allStepsCompleted) {
            console.log("All steps completed, showing result.");
        } else {
            console.log("Not all steps are completed yet.");
        }
    };

    useEffect(() => {
        checkCompletion();
    }, [targetAmount, timeHorizon, initialAmount, contributionFrequency, contributionTiming, annualInvestmentTarget]);

    const handleInputChange = (setter, nextStep, value, stepToShow) => {
        console.log(`Setting ${nextStep} with value:`, value);
        setter(Number(value));
        setShowSteps(prev => ({ ...prev, [nextStep]: true, [stepToShow]: true }));
    };

    const handleTargetAmountChange = (value) => {
        console.log("Step 1 - Target Amount:", value);
        handleInputChange(setTargetAmount, "boxOne", value, "step2");
    };

    const handleTimeHorizonChange = (value) => {
        console.log("Step 2 - Time Horizon:", value);
        handleInputChange(setTimeHorizon, "boxTwo", value, "step3");
    };

    const handleInitialAmountChange = (value) => {
        console.log("Step 3 - Initial Amount:", value);
        handleInputChange(setInitialAmount, "boxThree", value, "step4");
    };

    const handleContributionFrequencyChange = (value) => {
        console.log("Step 4 - Contribution Frequency:", value);
        setContributionFrequency(value);
        setShowSteps(prev => ({ ...prev, boxFour: true, step5: true }));
    };

    const handleContributionTimingChange = (value) => {
        console.log("Step 5 - Contribution Timing:", value);
        setContributionTiming(value);
        setShowSteps(prev => ({ ...prev, boxFive: true, step6: true }));
    };

    const handleAnnualInvestmentTargetChange = (value) => {
        console.log("Step 6 - Annual Investment Target:", value);
        setAnnualInvestmentTarget(Number(value));
    };

    const handleExpectedReturnChange = (value) => {
        console.log("Setting Expected Return:", value);
        setExpectedReturn(Number(value));
    };

    const handleInvestmentDurationChange = (value) => {
        console.log("Setting Investment Duration:", value);
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
                    {isDarkMode ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="32"
                            height="32"
                        >
                            <circle cx="32" cy="32" r="4" fill="#000" />
                            <line x1="32" y1="20" x2="32" y2="24" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="32" y1="40" x2="32" y2="44" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="20" y1="32" x2="24" y2="32" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="40" y1="32" x2="44" y2="32" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="23" y1="23" x2="26" y2="26" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="38" y1="38" x2="41" y2="41" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="23" y1="41" x2="26" y2="38" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                            <line x1="41" y1="23" x2="38" y2="26" stroke="#505070" stroke-width="3" stroke-linecap="round" />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="32"
                        height="32"
                        >
                        <circle cx="32" cy="32" r="10" fill="#fff" />
                        <circle cx="36" cy="28" r="7" fill="#1E293B" />
                        </svg>
                    )}
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
                            <box-icon name='chevron-right' color="#FFFFFF"></box-icon>
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

                        <div className="strategy">
                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Uangmu Saat Ini</h1>
                                    <h1>&nbsp;</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>

                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Target Investasi</h1>
                                    <h1>&nbsp;{formatCurrency(targetAmount)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>

                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Jumlah investasi / bulan</h1>
                                    <h1>&nbsp;{formatCurrency(annualInvestmentTarget)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>

                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Return Investasi</h1>
                                    <h1>{expectedReturn}%</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>

                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Lama Investasi</h1>
                                    <h1>{investmentDuration}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>

                            <div>
                                <box-icon type="solid" name="bank">#shadow-root (open)</box-icon>
                                <div className="strategy-content">
                                    <h1>Jumlah Investasi</h1>
                                    <h1>&nbsp;{formatCurrency(targetAmount)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
