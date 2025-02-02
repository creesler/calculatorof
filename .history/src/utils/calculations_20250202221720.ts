import { ROIInputs, ROIResults } from '../types/calculator';
import { LoanInputs, LoanResults } from '../types/calculator';
import { BMIInputs, BMIResults } from '../types/calculator';
import { CalorieInputs, CalorieResults } from '../types/calculator';

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

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // Little or no exercise
  light: 1.375,        // Light exercise 1-3 times/week
  moderate: 1.55,      // Moderate exercise 3-5 times/week
  active: 1.725,       // Heavy exercise 6-7 times/week
  veryActive: 1.9      // Very heavy exercise, physical job
};

const GOAL_ADJUSTMENTS = {
  maintain: 0,
  lose: -500,          // 500 calorie deficit for weight loss
  gain: 500            // 500 calorie surplus for weight gain
};

export const calculateCalories = (inputs: CalorieInputs): CalorieResults => {
  const { age, gender, weight, height, unit, activityLevel, goal } = inputs;
  
  // Convert to metric if needed
  const weightKg = unit === 'metric' ? weight : weight * 0.453592;
  const heightCm = unit === 'metric' ? height : height * 2.54;
  
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr: number;
  if (gender === 'male') {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  } else {
    bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
  }
  
  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  
  // Adjust calories based on goal
  const dailyCalories = tdee + GOAL_ADJUSTMENTS[goal];
  
  // Calculate macronutrients (protein 30%, carbs 40%, fats 30%)
  const macronutrients = {
    protein: Math.round((dailyCalories * 0.3) / 4), // 4 calories per gram of protein
    carbs: Math.round((dailyCalories * 0.4) / 4),   // 4 calories per gram of carbs
    fats: Math.round((dailyCalories * 0.3) / 9)     // 9 calories per gram of fat
  };
  
  // Calculate weekly goal (weight change)
  const weeklyGoal = GOAL_ADJUSTMENTS[goal] * 7 / 7700; // 7700 calories = 1kg of body fat

  return {
    bmr: Math.round(bmr),
    dailyCalories: Math.round(dailyCalories),
    macronutrients,
    weeklyGoal: Number(weeklyGoal.toFixed(2))
  };
}; 