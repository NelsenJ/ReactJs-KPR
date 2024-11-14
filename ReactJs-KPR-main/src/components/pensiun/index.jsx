import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Footer from "../items/footer";
import 'boxicons';
import QuestionImg from "../items/questionImg";
import QuestionRp from "../items/question-Rp";
import Question_perc from "../items/question-Perc";
import QuestionYear from "../items/question-Year";
import QuestionBox from "../items/questionBox";

//hello ngantuk nn ak
export default function PENSI() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [propertyPrice, setPropertyPrice] = useState(0);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [fixedInterestRate, setFixedInterestRate] = useState(0);
    const [showResult, setShowResult] = useState(false);

    //Pensiun
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [annualExpense, setAnnualExpense] = useState(0);
    const [currentAge, setCurrentAge] = useState(0);
    const [retirementAge, setRetirementAge] = useState(0);
    const [annualInflation, setAnnualInflation] = useState(0);
    const [annualExpenseAtRetirement, setAnnualExpenseAtRetirement] = useState(0);
    const [availableRetirementFund, setAvailableRetirementFund] = useState(0);
    const [monthlyInvestmentTarget, setMonthlyInvestmentTarget] = useState(0);
    const [annualInvestmentReturn, setAnnualInvestmentReturn] = useState(0);
    const [monthlyInvestment, setMonthlyInvestment] = useState(0);
    const [annualReturn, setAnnualReturn] = useState(0);
    const [yearsUntilRetirement, setYearsUntilRetirement] = useState(0);
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
            
            const totalAmountNeeded = calculateTotalAmountNeeded();
            setTotalAmountNeeded(totalAmountNeeded);
        }
    };




    const calculateInvestmentResult = () => {
        const yearsToRetirement = retirementAge - currentAge;

        if (yearsToRetirement <= 0 || monthlyInvestmentTarget <= 0 || annualInvestmentReturn <= 0) {
            return 0;
        }

        // Future Value of Initial Investment (if available)
        const FV_initial = availableRetirementFund * (1 + annualInvestmentReturn / 100) ** yearsToRetirement;

        // Future Value of Monthly Investment
        const FV_monthly = monthlyInvestmentTarget * (((1 + annualInvestmentReturn / 100 / 12) ** (12 * yearsToRetirement) - 1) / (annualInvestmentReturn / 100 / 12));

        // Total future value from both initial fund and monthly investments
        const totalInvestmentValue = FV_initial + FV_monthly;

        return totalInvestmentValue;
    };

    const investmentResult = calculateInvestmentResult();


    const handleInvestmentTargetChange = (value) => {
        setMonthlyInvestmentTarget(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev, step7: true }));
    };

    
    const calculateTotalAmountNeeded = () => {
        const totalAmountNeeded = annualExpenseAtRetirement * 25;
        return totalAmountNeeded;
    };
    
    const [totalAmountNeeded, setTotalAmountNeeded] = useState(0);
    const handleRetirementFundChange = (value) => {
        setAvailableRetirementFund(Number(value));
        if (value > 0) setShowSteps(prev => ({ ...prev,  step6:true}));
    };
    const investmentShortfall = totalAmountNeeded > investmentResult ? totalAmountNeeded - investmentResult : 0;

    const calculateInitialPrincipal = () => {
        const r = annualReturn / 100; // Konversi persen menjadi desimal
        const n = yearsUntilRetirement;
        const P = monthlyInvestment;

        // Nilai Masa Depan dari Investasi Bulanan
        const FV_monthly = P * (((1 + r / 12) ** (12 * n) - 1) / (r / 12));

        // Menghitung Pokok Awal yang diperlukan
        const initialPrincipal = (totalAmountNeeded - FV_monthly) / ((1 + r) ** n);

        return initialPrincipal > 0 ? initialPrincipal : 0; // Tampilkan 0 jika hasil negatif
    };

    const requiredInitialInvestment = calculateInitialPrincipal();
    

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

            <div className="content contentpensi">
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
                    <QuestionRp 
                        title="Pengeluaran / bulan."
                        onValueChange={handleMonthlyExpenseChange}
                    />
                )}

                {showSteps.boxOne && (
                    <QuestionBox 
                        title="Pengeluaran / tahun"
                        text={formatCurrency(annualExpense)}
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
                    <QuestionYear 
                    title="Usiamu sekarang"
                    onValueChange={UmurSekarang}
                    unit="tahun"
                    />
                )}

                {showSteps.step3 && (
                    <QuestionYear 
                    title="Kamu ingin pensiun di usia"
                    onValueChange={UmurPensi}
                    unit="tahun"
                    />
                )}

                {showSteps.step4 && (
                    <Question_perc 
                        title="Asumsi inflasi tahunan"
                        onValueChange={AsumsiInflasiTahunan}
                        unit="% / tahun"
                    />
                )}

            {showSteps.boxTwo && (
                <QuestionBox 
                    title="Pengeluaran tahunan saat mulai pensiun nanti"
                    text={formatCurrency(annualExpenseAtRetirement)}
                    color="#014737"
                />
            )}
            {showSteps.boxThree && (
                <QuestionBox 
                    title={`Uang yang kamu butuhkan ${retirementAge - currentAge} Tahun lagi berdasarkan 4% rule`}
                    text={formatCurrency(totalAmountNeeded)}
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
                    <QuestionRp 
                        title="Dana pensiun yang telah tersedia sampai saat ini"
                        onValueChange={handleRetirementFundChange}
                        unit="% / tahun"
                    />
                )}
            {showSteps.step6 && (
                    <QuestionRp
                        title="Target investasimu tiap bulan"
                        onValueChange={handleInvestmentTargetChange}
                        unit="% / tahun"
                    />
                )}
            {showSteps.step7 && (
                <Question_perc 
                    title="Target return investasi per tahun"
                    onValueChange={handleInvestmentReturnChange}
                    unit="% / tahun"
                />
            )}

            {showSteps.boxFour && (
                <QuestionBox 
                    title={"Kamu akan pensiun dalam"}
                    text={`${retirementAge - currentAge} tahun`}
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
                        {/* <h1>Analisa</h1> */}
                        <div className="analysis">
                            <div className="top">
                                <box-icon name='info-circle'></box-icon>
                                <p>Total uang yang kamu butuhkan <br />{formatCurrency(totalAmountNeeded)}</p>
                            </div>

                        </div>
                                
                        <h1>Strategimu</h1>
                        <div className="strategy">
                            <div>
                                <box-icon type='solid' name='bank'></box-icon>
                                <div className="strategy-content pensiunh1">
                                    <h1>Uangmu saat ini</h1>
                                    <h1>{formatCurrency(availableRetirementFund)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='credit-card' type='solid'></box-icon>
                                <div className="strategy-content">
                                    <h1>Jumlah investasi/bulan</h1>
                                    <h1>{formatCurrency(monthlyInvestmentTarget)}</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='credit-card' type='solid'></box-icon>
                                <div className="strategy-content">
                                    <h1>Return investasi</h1>
                                    <h1>{annualInvestmentReturn}% / tahun</h1>
                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon name='money'></box-icon>
                                <div className="strategy-content">
                                    <h1>Lama investasi</h1>
                                    <h1>{retirementAge - currentAge} tahun</h1>

                                    <div className="underscores"></div>
                                </div>
                            </div>
                            <div>
                                <box-icon type='solid' name='bank'></box-icon>
                                <div className="strategy-content">
                                    <h1>Hasil investasi</h1>
                                    <h1>{formatCurrency(investmentResult)}</h1>
                                    {investmentShortfall > 0 && (
                                        <div className="ngutang">
                                            <i>Kurang {formatCurrency(investmentShortfall)}</i>
                                        </div>
                                    )}
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
