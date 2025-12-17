import { Expense, Profile, Totals } from '@/types/finance';

export const calculateTotals = (expenses: Expense[]): Totals => {
  return expenses.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.totalIncome += item.amount;
      } else {
        acc.totalExpenses += item.amount;
      }
      acc.available = acc.totalIncome - acc.totalExpenses;
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, available: 0 }
  );
};

export const healthStatus = (available: number) => {
  if (available >= 500) {
    return { label: 'On Track', tone: 'success' as const, message: 'You have room to save or invest.' };
  }
  if (available >= 0) {
    return {
      label: 'Tight but OK',
      tone: 'warning' as const,
      message: 'Small buffer. Watch spending this week.'
    };
  }
  return {
    label: 'Needs Attention',
    tone: 'danger' as const,
    message: 'Spending exceeds income. Trim non-essentials first.'
  };
};

export const buildAdvisorSuggestions = (profile: Profile | null, totals: Totals) => {
  if (!profile) {
    return [
      'Tell us your income range, goal, and comfort with risk to see tailored tips.',
      'Log a few expenses so we can spot where to save.'
    ];
  }

  const suggestions: string[] = [];
  const { available } = totals;
  const risk = profile.riskLevel;

  if (available <= 0) {
    suggestions.push(
      'You are spending more than you earn. Pause “nice-to-haves” for a week (entertainment/food out).',
      'List fixed bills vs flexible costs. Cut from the flexible list first.'
    );
  } else {
    const savePct = risk === 'Low' ? 0.8 : risk === 'Medium' ? 0.6 : 0.4;
    const investPct = risk === 'Low' ? 0.2 : risk === 'Medium' ? 0.4 : 0.6;
    const saveAmount = Math.round(available * savePct);
    const investAmount = Math.round(available * investPct);
    suggestions.push(
      `Set aside ~$${saveAmount} this month for safety (emergency or debt).`,
      `Consider investing ~$${investAmount} in a simple diversified fund (e.g., broad index ETF).`
    );
  }

  if (risk === 'Low') {
    suggestions.push('Keep debt low and cash buffer high (1–3 months of expenses).');
  } else if (risk === 'Medium') {
    suggestions.push('Balance: pay debt steadily and invest monthly to grow over time.');
  } else {
    suggestions.push('Invest regularly but keep at least 1 month of expenses in cash for surprises.');
  }

  suggestions.push('Automate: set one transfer after each paycheck to “savings” and one to “invest”.');

  return suggestions;
};

