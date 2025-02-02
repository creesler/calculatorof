export interface ROIInputs {
  initialInvestment: number;
  annualRevenue: number;
  annualCosts: number;
  timeframe: number;
}

export interface ROIResults {
  roi: number;
  netProfit: number;
  paybackPeriod: number;
}

export interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'weekly';
}

export interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
} 