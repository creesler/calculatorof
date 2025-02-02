import { ROIInputs, ROIResults } from '../types/calculator';
import { LoanInputs, LoanResults } from '../types/calculator';

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