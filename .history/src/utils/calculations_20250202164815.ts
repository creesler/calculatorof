import { ROIInputs, ROIResults } from '../types/calculator';

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