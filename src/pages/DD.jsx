import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/items/footer';
import QuestionImg from '../components/items/questionImg';
import QuestionRp from '../components/items/question-Rp';
import QuestionPerc from '../components/items/question-Perc';
import QuestionYear from '../components/items/question-Year';
import Quote from '../components/items/quote';

const EmergencyFundCalculator = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [inputs, setInputs] = useState({
    monthlyExpenses: 0,
    dependents: 0,
    monthlyIncome: 0,
    emergencyFundDuration: 0,
    currentEmergencyFund: 0,
  });
  const [showSteps, setShowSteps] = useState({
    imgOne: true,
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    imgTwo: false,
    step5: false,
    result: false,
  });

  const navigate = useNavigate();

  const requiredEmergencyFund = useMemo(() => {
    const { monthlyExpenses, dependents, emergencyFundDuration } = inputs;
    return monthlyExpenses > 0 && dependents >= 0 && emergencyFundDuration > 0
      ? monthlyExpenses * (dependents + 1) * emergencyFundDuration
      : 0;
  }, [inputs]);

  const remainingEmergencyFund = useMemo(() => {
    const { currentEmergencyFund } = inputs;
    return Math.max(0, requiredEmergencyFund - currentEmergencyFund);
  }, [requiredEmergencyFund, inputs]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount || 0);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('light-mode', !newMode);
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: Math.max(0, Number(value) || 0),
    }));

    const stepMapping = {
      monthlyExpenses: 'step2',
      dependents: 'step3',
      monthlyIncome: 'step4',
      emergencyFundDuration: 'step5',
      currentEmergencyFund: 'result',
    };

    if (stepMapping[field]) {
      setShowSteps((prev) => ({ ...prev, [stepMapping[field]]: true }));
    }
  };

  return (
    <>
      <div className="header hed">
        <div className="header-flex">
          <span onClick={() => navigate('/')}>
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
            onValueChange={(value) => handleInputChange('monthlyExpenses', value)}
          />
        )}

        {showSteps.step2 && (
          <QuestionPerc
            title="Number of dependents"
            text="persons"
            color="#014737"
            onValueChange={(value) => handleInputChange('dependents', value)}
          />
        )}

        {showSteps.step3 && (
          <QuestionRp
            title="Your monthly income"
            onValueChange={(value) => handleInputChange('monthlyIncome', value)}
          />
        )}

        {showSteps.step4 && (
          <QuestionYear
            title="How long do you want to save for your emergency fund?"
            onValueChange={(value) => handleInputChange('emergencyFundDuration', value)}
          />
        )}

        {showSteps.step5 && (
          <QuestionRp
            title="How much do you have in your emergency fund now?"
            onValueChange={(value) => handleInputChange('currentEmergencyFund', value)}
          />
        )}

{showSteps.result && (
  <div className="result-summary animate-slide-down">
    <div className="result-summary-header">
      <span onClick={() => setShowSteps((prev) => ({ ...prev, result: false }))}>
        <box-icon name="x"></box-icon>
      </span>
    </div>
    <h1>Analysis</h1>
    <div className="analysis">
      <div className="top">
        <box-icon name="info-circle"></box-icon>
        <p>
          The total emergency fund required is <strong>{formatCurrency(requiredEmergencyFund)}</strong>. 
          This is calculated based on your monthly expenses, the number of dependents, and the duration you specified.
        </p>
      </div>
      <div className="bottom">
        <box-icon name="check-circle"></box-icon>
        <p>
          You currently have <strong>{formatCurrency(inputs.currentEmergencyFund)}</strong> saved, 
          which is {((inputs.currentEmergencyFund / requiredEmergencyFund) * 100).toFixed(2)}% of your target.
        </p>
        {remainingEmergencyFund > 0 && (
          <>
            <box-icon name="exclamation-circle"></box-icon>
            <p className="analysis-warning">
              You need an additional <strong>{formatCurrency(remainingEmergencyFund)}</strong> to reach your goal.
            </p>
            {remainingEmergencyFund / requiredEmergencyFund > 0.5 && (
              <p className="analysis-recommendation">
                Consider adjusting your monthly savings or extending the duration to make the goal more achievable.
              </p>
            )}
          </>
        )}
        {remainingEmergencyFund <= 0 && (
          <p className="analysis-success">
            Congratulations! You have met or exceeded your emergency fund goal. 🎉
          </p>
        )}
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