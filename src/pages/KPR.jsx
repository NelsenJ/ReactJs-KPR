import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./KPR.css";
import Footer from "../components/items/footer";
import 'boxicons';
import QuestionImg from "../components/items/questionImg";
import QuestionRp from "../components/items/question-Rp";
import QuestionPerc from "../components/items/question-Perc";
import QuestionBox from "../components/items/questionBox";
import QuestionYear from "../components/items/question-Year";
import Quote from "../components/items/quote";

export default function KPR() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [propertyPrice, setPropertyPrice] = useState(0);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [fixedInterestRate, setFixedInterestRate] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showSteps, setShowSteps] = useState({
        imgOne: true, 
        step1: true, 
        step2: false, 
        step3: false,
        boxOne: false, 
        step4: false, 
        imgTwo: false, 
        step5: false,
        step6: false, 
        boxTwo: false
    });

    const navigate = useNavigate();
    
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setIsDarkMode(savedMode === 'true');
            if (savedMode === 'false') {
                document.body.classList.add('light-mode');
            }
        }
    }, []);

    const loanAmount = useMemo(() => {
        if (propertyPrice && downPaymentPercentage) {
            const downPaymentAmount = (propertyPrice * downPaymentPercentage) / 100;
            return propertyPrice - downPaymentAmount;
        }
        return 0;
    }, [propertyPrice, downPaymentPercentage]);

    const monthlyPayment = useMemo(() => {
        if (loanAmount && loanTerm && fixedInterestRate) {
            const monthlyInterest = fixedInterestRate / 12 / 100;
            const numberOfPayments = loanTerm * 12;
            return (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
                   (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
        }
        return 0;
    }, [loanAmount, loanTerm, fixedInterestRate]);

    const totalInterest = useMemo(() => {
        if (monthlyPayment && loanTerm) {
            return (monthlyPayment * loanTerm * 12) - loanAmount;
        }
        return 0;
    }, [monthlyPayment, loanTerm, loanAmount]);

    const monthlyPaymentRatio = useMemo(() => {
        if (monthlyPayment && monthlyIncome) {
            return (monthlyPayment / monthlyIncome) * 100;
        }
        return 0;
    }, [monthlyPayment, monthlyIncome]);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR' 
        }).format(number);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', !isDarkMode);
        document.body.classList.toggle('light-mode');
        
        // Update the color attribute of all box-icon elements based on the mode
        const boxIcons = document.querySelectorAll("box-icon");
        boxIcons.forEach(icon => {
            if (!isDarkMode) {
                icon.setAttribute("color", "#FFFFFF"); // Dark color for light mode
            } else {
                icon.setAttribute("color", "#1E293B"); // Light color for dark mode
            }
        });
    };
    

    const handleClick = () => {
        navigate('/');
    };

    const handleShowResult = () => setShowResult(true);

    const handlePropertyPriceChange = (value) => {
        setPropertyPrice(Number(value));
        if (value > 0) setShowSteps(prev => ({...prev, step2: true}));
    };

    const handleDownPaymentChange = (value) => {
        setDownPaymentPercentage(Number(value));
        if (value > 0) setShowSteps(prev => ({...prev, step3: true, boxOne: true}));
    };

    const handleMonthlyIncomeChange = (value) => {
        setMonthlyIncome(Number(value));
        if (value > 0) setShowSteps(prev => ({...prev, imgTwo: true, step4: true}));
    };

    const handleLoanTermChange = (value) => {
        setLoanTerm(Number(value));
        if (value > 0) setShowSteps(prev => ({...prev, step5: true}));
    };

    const handleFixedInterestChange = (value) => {
        setFixedInterestRate(Number(value));
        if (value > 0) setShowSteps(prev => ({...prev, boxTwo: true}));
    };

    return (
        <>
            <div className="header hed">
                <div className="header-flex">
                    <span onClick={handleClick}>
                        {isDarkMode ? (
                            <box-icon name='arrow-back'color='#fff'></box-icon>
                        ) : (
                            <box-icon name='arrow-back'color='#000'></box-icon>
                        )}
                    </span>
                    <h1 className="header-title">🏚️ Simulasi KPR</h1>
                    <p className="header-dark-mode" onClick={toggleDarkMode}>
                        {isDarkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                width="32"
                                height="32"
                            >
                                <circle cx="32" cy="32" r="10" fill="#fff" />
                                <circle cx="36" cy="28" r="7" fill="#1E293B" />
                            </svg>
                        ) : (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width="32"
                            height="32"
                            >
                                <circle cx="32" cy="32" r="4" fill="#000" />
                                <line x1="32" y1="20" x2="32" y2="24" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="32" y1="40" x2="32" y2="44" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="20" y1="32" x2="24" y2="32" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="40" y1="32" x2="44" y2="32" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="23" y1="23" x2="26" y2="26" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="38" y1="38" x2="41" y2="41" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="23" y1="41" x2="26" y2="38" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="41" y1="23" x2="38" y2="26" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        )}
                    </p>
                </div>
            </div>

            <div className="content">
                <Quote />

                {showSteps.imgOne && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                        text="Kita mulai dari properti impianmu."
                    />
                )}

                {showSteps.step1 && (
                    <QuestionRp
                        title="Harga Properti Impianmu Saat Ini"
                        onValueChange={handlePropertyPriceChange}
                    />
                )}

                {showSteps.step2 && (
                    <QuestionPerc 
                        title="Berapa % yang mau kamu DP (Down Payment)"
                        onValueChange={handleDownPaymentChange}
                    />
                )}

                {showSteps.boxOne && (
                    <QuestionBox 
                        title="Jumlah Pinjaman"
                        text={formatCurrency(loanAmount)}
                        color={isDarkMode ? "#014737" : "#bbefda"} // White for light mode, dark for dark mode
                        textColor={isDarkMode ? "#FFFFFF" : "#000000"} // Black text for light mode, white text for dark mode
                    />
                )}

                {showSteps.step3 && (
                    <QuestionRp
                        title="Penghasilan bulananmu"
                        onValueChange={handleMonthlyIncomeChange}
                    />
                )}

                {showSteps.imgTwo && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                        text="Thank You!"
                        text2="Next, kita butuh informasi detail KPR mu!"
                    />
                )}

                {showSteps.step4 && (
                    <QuestionYear
                        title="Kamu mau KPR berapa lama?"
                        onValueChange={handleLoanTermChange}
                    />
                )}

                {showSteps.step5 && (
                    <QuestionRp 
                        title="% Bunga fix"
                        onValueChange={handleFixedInterestChange}
                    />
                )}

                {showSteps.boxTwo && (
                    <QuestionBox 
                        title="Angsuran Bulanan"
                        text={formatCurrency(monthlyPayment)}
                        color={isDarkMode ? "#334155" : "#CBD5E1"} // White for light mode, dark for dark mode
                        textColor={isDarkMode ? "#FFFFFF" : "#000000"} // Black text for light mode, white text for dark mode
                    />
                )}


                {showSteps.boxTwo && (
                    <div className="hasil">
                        <div>
                            <p className="yay">Yay, mimpimu sudah jauh lebih nyata.</p>
                            <p className="yok">Ayo lihat hasil strategimu</p>
                        </div>
                        <button className="butttt" onClick={handleShowResult}>
                            <box-icon name='chevron-right' color={isDarkMode ? "#FFFFFF" : "#000000"} ></box-icon>
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
                        <h1>Analisa</h1>
                        <div className="analysis">
                            <div className="top">
                                <box-icon name='info-circle'></box-icon>
                                <p>Total bunga KPR yang harus kamu bayarkan adalah {formatCurrency(totalInterest)} setara dengan {((totalInterest / loanAmount) * 100).toFixed(2)}% dari pokok pinjamanmu.</p>
                            </div>
                            <div className="bottom">
                                <box-icon name='happy-heart-eyes'></box-icon>
                                <div>
                                    <p>Cicilan KPRmu dalam rentang {formatCurrency(monthlyPayment)} dan ini setara dengan {monthlyPaymentRatio.toFixed(2)}% dari penghasilan bulananmu.</p>
                                    {monthlyPaymentRatio > 30 && (
                                        <>
                                            <p className="analysis-color">Rasio ini sudah berbahaya, karena berpotensi mengganggu cash flow mu di masa depan.</p>
                                            <p className="analysis-color">Pertimbangkan untuk menambah DP atau memperpanjang masa KPR mu.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                                
                        <h1>Strategimu</h1>
                        <div className="strategy">
                            <div>
                                <box-icon type='solid' name='bank'></box-icon>
                                <div className="strategy-content">
                                    <h1>Pokok Pinjaman</h1>
                                    <h1>{formatCurrency(loanAmount)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='credit-card' type='solid'></box-icon>
                                <div className="strategy-content">
                                    <h1>Periode KPR</h1>
                                    <h1>{loanTerm} Tahun ({loanTerm * 12} Bulan)</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='money'></box-icon>
                                <div className="strategy-content">
                                    <h1>Bunga Fix</h1>
                                    <h1>{fixedInterestRate}%</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon type='solid' name='bank'></box-icon>
                                <div className="strategy-content">
                                    <h1>Total Bunga KPR</h1>
                                    <h1>{formatCurrency(totalInterest)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='credit-card' type='solid'></box-icon>
                                <div className="strategy-content">
                                    <h1>Angsuran Bulanan</h1>
                                    <h1>{formatCurrency(monthlyPayment)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='money'></box-icon>
                                <div className="strategy-content">
                                    <h1>% Total Bunga dari Pokok Pinjaman</h1>
                                    <h1>{((totalInterest / loanAmount) * 100).toFixed(2)}%</h1>
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
