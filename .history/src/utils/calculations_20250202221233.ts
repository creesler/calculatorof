import { ROIInputs, ROIResults } from '../types/calculator';
import { LoanInputs, LoanResults } from '../types/calculator';
import { BMIInputs, BMIResults } from '../types/calculator';

export const calculateROI = (inputs: ROIInputs): ROIResults => {
  const { initialInvestment, annualRevenue, annualCosts, timeframe } = inputs;
  
  const totalRevenue = annualRevenue * timeframe;
  const totalCosts = (annualCosts * timeframe) + initialInvestment;
  const netProfit = totalRevenue - totalCosts;
  
  const roi = (netProfit / initialInvestment) * 100;
  const paybackPeriod = initialInvestment / (annualRevenue - annualCosts);

  return {
    roi: Number(roi.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    paybackPeriod: Number(paybackPeriod.toFixed(2))
  };
};

export const calculateLoan = (inputs: LoanInputs): LoanResults => {
  const { loanAmount, interestRate, loanTerm, paymentFrequency } = inputs;
  
  // Convert annual rate to monthly
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  
  // Calculate monthly payment using the loan amortization formula
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  // Calculate total payment and interest
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;
  
  // Generate amortization schedule
  let balance = loanAmount;
  const amortizationSchedule = [];
  
  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    
    amortizationSchedule.push({
      payment: Number(monthlyPayment.toFixed(2)),
      principal: Number(principal.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      balance: Number(balance.toFixed(2))
    });
  }
  
  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    amortizationSchedule
  };
};

export const calculateBMI = (inputs: BMIInputs): BMIResults => {
  const { weight, height, unit } = inputs;
  let bmi: number;
  
  if (unit === 'metric') {
    // BMI = weight(kg) / height(m)²
    bmi = weight / Math.pow(height / 100, 2);
  } else {
    // BMI = 703 × weight(lb) / height(in)²
    bmi = (703 * weight) / Math.pow(height, 2);
  }
  
  // Calculate healthy weight range (BMI 18.5-24.9)
  let healthyWeightRange = {
    min: 0,
    max: 0
  };
  
  if (unit === 'metric') {
    const heightInMeters = height / 100;
    healthyWeightRange = {
      min: 18.5 * Math.pow(heightInMeters, 2),
      max: 24.9 * Math.pow(heightInMeters, 2)
    };
  } else {
    healthyWeightRange = {
      min: (18.5 * Math.pow(height, 2)) / 703,
      max: (24.9 * Math.pow(height, 2)) / 703
    };
  }

  // Determine BMI category
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return {
    bmi: Number(bmi.toFixed(1)),
    category,
    healthyWeightRange: {
      min: Number(healthyWeightRange.min.toFixed(1)),
      max: Number(healthyWeightRange.max.toFixed(1))
    }
  };
}; 