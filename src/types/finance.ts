export type RiskLevel = 'Low' | 'Medium' | 'High';

export type IncomeRange = 'Under $30k' | '$30k-$60k' | '$60k-$100k' | '$100k+';

export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Income'
  | 'Housing'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Debt'
  | 'Savings'
  | 'Other';

export interface Profile {
  incomeRange: IncomeRange;
  primaryGoal: string;
  riskLevel: RiskLevel;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  date: string;
}

export interface Totals {
  totalIncome: number;
  totalExpenses: number;
  available: number;
}

export const incomeRanges: IncomeRange[] = [
  'Under $30k',
  '$30k-$60k',
  '$60k-$100k',
  '$100k+'
];

export const categories: Category[] = [
  'Income',
  'Housing',
  'Food',
  'Transport',
  'Entertainment',
  'Debt',
  'Savings',
  'Other'
];

