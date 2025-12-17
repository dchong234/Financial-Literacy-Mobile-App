import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { categories, Category, Expense, Profile, TransactionType } from '@/types/finance';

type ExpenseInput = Omit<Expense, 'id' | 'date'> & { date?: string };

interface AppState {
  profile: Profile | null;
  expenses: Expense[];
  setProfile: (profile: Profile) => void;
  addExpense: (expense: ExpenseInput) => void;
  updateExpense: (id: string, updates: Partial<Omit<Expense, 'id'>>) => void;
  removeExpense: (id: string) => void;
  seedSampleExpenses: () => void;
  clearAll: () => void;
}

const makeId = () => Math.random().toString(36).slice(2);

const sampleExpenses: Expense[] = [
  {
    id: makeId(),
    description: 'Paycheck',
    amount: 3200,
    category: 'Income',
    type: 'income',
    date: new Date().toISOString()
  },
  {
    id: makeId(),
    description: 'Rent',
    amount: 1200,
    category: 'Housing',
    type: 'expense',
    date: new Date().toISOString()
  },
  {
    id: makeId(),
    description: 'Groceries',
    amount: 240,
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString()
  },
  {
    id: makeId(),
    description: 'Bus pass',
    amount: 60,
    category: 'Transport',
    type: 'expense',
    date: new Date().toISOString()
  }
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      expenses: [],
      setProfile: (profile) => set({ profile }),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            {
              ...expense,
              id: makeId(),
              date: expense.date ?? new Date().toISOString()
            },
            ...state.expenses
          ]
        })),
      updateExpense: (id, updates) =>
        set((state) => ({
          expenses: state.expenses.map((item) =>
            item.id === id ? { ...item, ...updates, id: item.id } : item
          )
        })),
      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((item) => item.id !== id)
        })),
      seedSampleExpenses: () => set({ expenses: [...sampleExpenses] }),
      clearAll: () => set({ profile: null, expenses: [] })
    }),
    {
      name: 'financial-literacy-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        expenses: state.expenses
      }),
      version: 1
    }
  )
);

export const transactionTypes: TransactionType[] = ['income', 'expense'];

export const expenseCategories: Category[] = categories.filter((c) => c !== 'Income');

