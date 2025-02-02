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

export interface BMIInputs {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';  // kg/m or lb/in
}

export interface BMIResults {
  bmi: number;
  category: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
}

export interface CalorieInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'maintain' | 'lose' | 'gain';
}

export interface CalorieResults {
  bmr: number;
  dailyCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  weeklyGoal: number;
}

export interface PetFoodInputs {
  petType: 'dog' | 'cat';
  weight: number;
  age: number;
  activityLevel: 'low' | 'moderate' | 'high';
  unit: 'metric' | 'imperial';
  foodType: 'dry' | 'wet';
}

export interface PetFoodResults {
  dailyCalories: number;
  foodAmount: number;
  mealsPerDay: number;
  amountPerMeal: number;
} 