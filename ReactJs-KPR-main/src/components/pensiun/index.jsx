import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Footer from "../items/footer";
import 'boxicons';
import QuestionImg from "../items/questionImg";
import Question1 from "../items/question1";
import QuestionBox from "../items/questionBox";

export default function PENSI() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [propertyPrice, setPropertyPrice] = useState(0);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [fixedInterestRate, setFixedInterestRate] = useState(0);
    const [showResult, setShowResult] = useState(false);

    //Pensiun
    const [monthlyExpense, setMonthlyExpense] = useState(0); // Pengeluaran per bulan
    const [annualExpense, setAnnualExpense] = useState(0); // Pengeluaran per tahun
    const [currentAge, setCurrentAge] = useState(0); // Umur sekarang
    const [retirementAge, setRetirementAge] = useState(0); // Umur pensiun
    const [annualInflation, setAnnualInflation] = useState(0); // Inflasi tahunan
    const [annualExpenseAtRetirement, setAnnualExpenseAtRetirement] = useState(0);
    const [availableRetirementFund, setAvailableRetirementFund] = useState(0);
    const [monthlyInvestmentTarget, setMonthlyInvestmentTarget] = useState(0);
    const [annualInvestmentReturn, setAnnualInvestmentReturn] = useState(0);
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
        step7: false, 
        boxTwo: false,
        boxThree: false,
        boxFour: false,
        boxFive: false
    });

    const navigate = useNavigate();

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

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setIsDarkMode(savedMode === 'true');
            if (savedMode === 'false') {
                document.body.classList.add('light-mode');
            }
        }
    }, []);



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
    


    // PENSIUN
    const handleMonthlyExpenseChange = (value) => {
        const monthly = Number(value);
        setMonthlyExpense(monthly);
        setAnnualExpense(monthly * 12);
        if (monthly > 0) setShowSteps(prev => ({ ...prev, boxOne: true, imgTwo: true, step2: true }));
    };
    const UmurSekarang = (value) => {
        setCurrentAge(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, step3: true }));
    };
    
    const UmurPensi = (value) => {
        setRetirementAge(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, step4: true }));
    };
    
    const handleInvestmentReturnChange = (value) => {
        setAnnualInvestmentReturn(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, boxFour: true, boxFive:true }));

    };

    const AsumsiInflasiTahunan = (value) => {
        setAnnualInflation(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, boxTwo: true, boxThree:true, imgThree:true, step5:true }));
    };
    const calculateRetirementExpense = () => {
        const yearsToRetirement = retirementAge - currentAge;
        if (yearsToRetirement > 0 && annualExpense > 0 && annualInflation > 0) {
            const inflationFactor = 1 + (annualInflation / 100);
            let expenseAtRetirement = annualExpense * Math.pow(inflationFactor, yearsToRetirement);
            
            setAnnualExpenseAtRetirement(expenseAtRetirement);
            
            // Hitung total uang yang dibutuhkan berdasarkan 4% rule
            const totalAmountNeeded = calculateTotalAmountNeeded();
            setTotalAmountNeeded(totalAmountNeeded); // Set state untuk totalAmountNeeded
        }
    };

    const handleInvestmentTargetChange = (value) => {
        setMonthlyInvestmentTarget(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, step7: true }));
    };

    const calculateTotalAmountNeeded = () => {
        const totalAmountNeeded = annualExpenseAtRetirement * 25; // 4% rule
        return totalAmountNeeded;
    };
    
    const [totalAmountNeeded, setTotalAmountNeeded] = useState(0);
    const handleRetirementFundChange = (value) => {
        setAvailableRetirementFund(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev,  step6:true}));
    };
    
    
    useEffect(() => {
        calculateRetirementExpense();
    }, [annualExpense, annualInflation, currentAge, retirementAge]);
    
    useEffect(() => {
        calculateRetirementExpense();
    }, [annualExpense, annualInflation, currentAge, retirementAge]);

    

    return (
        <>
            <div className="header hed">
                <div className="header-flex">
                    <span onClick={handleClick}>
                        <box-icon name='arrow-back'></box-icon>
                    </span>
                    <h1 className="header-title">💺 Dana Pensiun</h1>
                    <p className="header-dark-mode" onClick={toggleDarkMode}>
                        {isDarkMode ? '☀️' : '🌙'}
                    </p>
                </div>
            </div>

            <div className="content">
                <div className="quotes animate-slide-right">
                    <box-icon type='solid' name='quote-alt-left' color="#808B9C"></box-icon>
                    <p>A goal without a plan is just a wish
                    </p>
                </div>

                {showSteps.imgOne && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                        text="Cari tahu pengeluaranmu per hari ini."
                    />
                )}

                {showSteps.step1 && (
                    <Question1 
                        title="Pengeluaran / bulan."
                        onValueChange={handleMonthlyExpenseChange}
                    />
                )}

                {showSteps.boxOne && (
                    <QuestionBox 
                        title="Pengeluaran / tahun"
                        text={formatCurrency(annualExpense)} // Display formatted annual expense
                        color="#014737"
                    />
                )}

                {showSteps.imgTwo && (
                    <QuestionImg 
                        imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                        text="Cari tahu pengeluaranmu saat pensiun nanti."
                    />
                )}

                {showSteps.step2 && (
                    <Question1 
                    title="Usiamu sekarang"
                    onValueChange={UmurSekarang}
                    unit="tahun"
                    />
                )}

                {showSteps.step3 && (
                    <Question1 
                    title="Kamu ingin pensiun di usia"
                    onValueChange={UmurPensi}
                    unit="tahun"
                    />
                )}

                {showSteps.step4 && (
                    <Question1 
                        title="Asumsi inflasi tahunan"
                        onValueChange={AsumsiInflasiTahunan}
                        unit="% / tahun"
                    />
                )}

            {showSteps.boxTwo && (
                <QuestionBox 
                    title="Pengeluaran tahunan saat mulai pensiun nanti"
                    text={formatCurrency(annualExpenseAtRetirement)} // Menampilkan pengeluaran pensiun
                    color="#014737"
                />
            )}
            {showSteps.boxThree && (
                <QuestionBox 
                    title={`Uang yang kamu butuhkan ${retirementAge - currentAge} Tahun lagi berdasarkan 4% rule`}
                    text={formatCurrency(totalAmountNeeded)} // Menampilkan jumlah uang yang dibutuhkan tanpa pembulatan
                    color="#014737"
                />
            )}

            {showSteps.imgThree && (
                <QuestionImg 
                    imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
                    text="Cari tahu jumlah investasi yang diperlukan."
                />
            )}
            
            {showSteps.step5 && (
                    <Question1 
                        title="Dana pensiun yang telah tersedia sampai saat ini"
                        onValueChange={handleRetirementFundChange}
                        unit="% / tahun"
                    />
                )}
            {showSteps.step6 && (
                    <Question1 
                        title="Target investasimu tiap bulan"
                        onValueChange={handleInvestmentTargetChange}
                        unit="% / tahun"
                    />
                )}
            {showSteps.step7 && (
                <Question1 
                    title="Target return investasi per tahun"
                    onValueChange={handleInvestmentReturnChange}
                    unit="% / tahun"
                />
            )}

            {showSteps.boxFour && (
                <QuestionBox 
                    title={"Kamu akan pensiun dalam"}
                    text={`${retirementAge - currentAge} tahun`} // Menampilkan jumlah uang yang dibutuhkan tanpa pembulatan
                    color="#014737"
                />
            )}
            
                {showSteps.boxFive && (
                    <div className="hasil">
                        <div>
                            <p className="pertama">Yay, mimpimu sudah jauh lebih nyata.</p>
                            <p className="kedua">Ayo lihat hasil strategimu</p>
                        </div>
                        <button onClick={handleShowResult}>
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
