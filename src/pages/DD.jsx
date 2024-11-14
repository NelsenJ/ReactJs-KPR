import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/items/footer';
import QuestionImg from '../components/items/questionImg';
import QuestionRp from '../components/items/question-Rp';
import QuestionPerc from '../components/items/question-Perc';
import QuestionBox from '../components/items/questionBox';
import QuestionYear from '../components/items/question-Year';
import QuestionOpt from '../components/items/questionOpt';
import Quote from '../components/items/quote';

const EmergencyFundCalculator = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Input States
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [emergencyFundDuration, setEmergencyFundDuration] = useState(0);
  const [currentEmergencyFund, setCurrentEmergencyFund] = useState(0);
  const [targetMonthlyInvestment, setTargetMonthlyInvestment] = useState(0);
  const [targetInvestmentReturn, setTargetInvestmentReturn] = useState(0);

  // UI Control States
  const [showResult, setShowResult] = useState(false);
  const [showSteps, setShowSteps] = useState({
    imgOne: true,
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    imgTwo: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    boxTwo: false
  });

  const navigate = useNavigate();

  // Derived States
  const requiredEmergencyFund = useMemo(() => {
    if (monthlyExpenses > 0 && dependents >= 0 && emergencyFundDuration > 0) {
      return monthlyExpenses * (dependents + 1) * emergencyFundDuration;
    }
    return 0;
  }, [monthlyExpenses, dependents, emergencyFundDuration]);

  const remainingEmergencyFund = useMemo(() => {
    if (requiredEmergencyFund > 0 && currentEmergencyFund >= 0) {
      return Math.max(0, requiredEmergencyFund - currentEmergencyFund);
    }
    return 0;
  }, [requiredEmergencyFund, currentEmergencyFund]);

  // Utility Functions
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount || 0);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  // Handlers
  const handleClick = () => navigate('/');

  const handleShowResult = () => setShowResult(true);

  const handleMonthlyExpensesChange = (value) => {
    setMonthlyExpenses(Number(value) || 0);
    setShowSteps((prev) => ({ ...prev, step2: true }));
  };

  const handleDependentsChange = (value) => {
    setDependents(Number(value) || 0);
    setShowSteps((prev) => ({ ...prev, step3: true }));
  };

  const handleMonthlyIncomeChange = (value) => {
    setMonthlyIncome(Number(value) || 0);
    setShowSteps((prev) => ({ ...prev, imgTwo: true, step4: true }));
  };

  const handleEmergencyFundDurationChange = (value) => {
    const duration = Number(value) || 0;
    if (duration > 0) {
      setEmergencyFundDuration(duration);
      setShowSteps((prev) => ({ ...prev, step5: true }));
    }
  };
  
  

  const handleCurrentEmergencyFundChange = (value) => {
    setCurrentEmergencyFund(Number(value) || 0);
    setShowSteps((prev) => ({ ...prev, boxTwo: true }));
  };

  const handleTargetMonthlyInvestmentChange = (value) => {
    setTargetMonthlyInvestment(Number(value) || 0);
  };

  const handleTargetInvestmentReturnChange = (value) => {
    setTargetInvestmentReturn(Number(value) || 0);
  };

  return (
    <>
      <div className="header hed">
        <div className="header-flex">
          <span onClick={handleClick}>
            <box-icon name="arrow-back"></box-icon>
          </span>
          <h1 className="header-title">‼️ Emergency Fund Calculator</h1>
          <p className="header-dark-mode" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </p>
        </div>
      </div>

      <div className="content">
        <Quote />

        {showSteps.imgOne && (
          <QuestionImg
            imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
            text="Let's talk about your dreams."
          />
        )}

        {showSteps.step1 && (
          <QuestionRp
            title="Your monthly expenses"
            onValueChange={handleMonthlyExpensesChange}
          />
        )}

        {showSteps.step2 && (
          <QuestionPerc
            title="Number of dependents"
            text="persons"
            color="#014737"
            onValueChange={handleDependentsChange}
          />
        )}

        {showSteps.step3 && (
          <QuestionRp
            title="Your monthly income"
            onValueChange={handleMonthlyIncomeChange}
          />
        )}

        {showSteps.imgTwo && (
          <QuestionImg
            imgSrc="https://feliciaputritjiasaka.com/assets/avatar/avatar-3.webp"
            text="Thank You!"
            text2="Next, let's set your emergency fund strategy!"
          />
        )}

        {showSteps.step4 && (
          <QuestionYear
            title="How long do you want to save for your emergency fund?"
            onValueChange={handleEmergencyFundDurationChange}
          />
        )}

        {showSteps.step5 && (
          <QuestionRp
            title="How much do you have in your emergency fund now?"
            onValueChange={handleCurrentEmergencyFundChange}
          />
        )}

        {showResult && (
          <div className="result-summary animate-slide-down">
            <div className="result-summary-header">
              <span onClick={() => setShowResult(false)} className="close-result-summary">
                <box-icon name="x"></box-icon>
              </span>
            </div>
            <h1>Analysis</h1>
            <div className="analysis">
              <div className="top">
                <box-icon name="info-circle"></box-icon>
                <p>Your required emergency fund is {formatCurrency(requiredEmergencyFund)}.</p>
              </div>
              <div className="bottom">
                <box-icon name="happy-heart-eyes"></box-icon>
                <div>
                  <p>
                    You currently have {formatCurrency(currentEmergencyFund)} in your emergency fund, which means you
                    need to save an additional {formatCurrency(remainingEmergencyFund)}.
                  </p>
                  {remainingEmergencyFund > 0 && (
                    <p className="analysis-color">
                      This amount is still missing from your emergency fund. You should increase your monthly
                      investments to reach your target.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EmergencyFundCalculator;
