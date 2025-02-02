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