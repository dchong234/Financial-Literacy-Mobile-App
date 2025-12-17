import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { categories, Expense } from '@/types/finance';
import { useAppStore, expenseCategories, transactionTypes } from '@/store/appStore';

const ExpensesScreen: React.FC = () => {
  const expenses = useAppStore((s) => s.expenses);
  const addExpense = useAppStore((s) => s.addExpense);
  const removeExpense = useAppStore((s) => s.removeExpense);
  const seedSample = useAppStore((s) => s.seedSampleExpenses);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[1]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [error, setError] = useState('');

  const totals = useMemo(() => {
    return expenses.reduce(
      (acc, item) => {
        if (item.type === 'income') acc.income += item.amount;
        else acc.expense += item.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [expenses]);

  const handleAdd = () => {
    const parsedAmount = Number(amount);
    if (!description.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Add a description and a positive amount.');
      return;
    }
    addExpense({
      description: description.trim(),
      amount: parsedAmount,
      category,
      type
    });
    setDescription('');
    setAmount('');
    setError('');
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listTitle}>{item.description}</Text>
        <Text style={styles.listMeta}>
          {item.category} • {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.amountRow}>
        <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
          {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => removeExpense(item.id)} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Income & Expenses</Text>
          <Text style={styles.subtitle}>Log items to see your spending and savings power.</Text>

          <View style={styles.card}>
            <View style={styles.toggleRow}>
              {transactionTypes.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.toggle, type === option && styles.toggleActive]}
                  onPress={() => setType(option)}
                >
                  <Text style={[styles.toggleText, type === option && styles.toggleTextActive]}>
                    {option === 'income' ? 'Income' : 'Expense'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="e.g., Paycheck or Groceries"
                placeholderTextColor={colors.subtleText}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={colors.subtleText}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.optionRow}>
                {(type === 'income' ? ['Income'] : expenseCategories).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.option, category === cat && styles.optionSelected]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      style={[styles.optionText, category === cat && styles.optionTextSelected]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {!!error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={seedSample}>
              <Text style={styles.secondaryButtonText}>Seed sample transactions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.income]}>${totals.income.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expense]}>
                ${totals.expense.toFixed(2)}
              </Text>
            </View>
          </View>

          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={
              <Text style={styles.empty}>Add an item to see it listed here.</Text>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtleText,
    lineHeight: 22
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12
  },
  fieldGroup: {
    gap: 6
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8
  },
  toggle: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center'
  },
  toggleActive: {
    borderColor: colors.primary,
    backgroundColor: '#E8F1FF'
  },
  toggleText: {
    fontSize: 15,
    color: colors.text
  },
  toggleTextActive: {
    fontWeight: '700',
    color: colors.primary
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E8F1FF'
  },
  optionText: {
    color: colors.text
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '700'
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700'
  },
  error: {
    color: colors.danger,
    fontSize: 14
  },
  listItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text
  },
  listMeta: {
    fontSize: 13,
    color: colors.subtleText
  },
  amountRow: {
    alignItems: 'flex-end',
    gap: 6
  },
  amount: {
    fontSize: 16,
    fontWeight: '700'
  },
  income: {
    color: colors.success
  },
  expense: {
    color: colors.danger
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6'
  },
  removeText: {
    color: colors.subtleText,
    fontSize: 12
  },
  empty: {
    color: colors.subtleText,
    marginTop: 12,
    textAlign: 'center'
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 4
  },
  summaryLabel: {
    color: colors.subtleText,
    fontSize: 13,
    fontWeight: '600'
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800'
  }
});

export default ExpensesScreen;

