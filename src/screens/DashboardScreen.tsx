import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { useAppStore } from '@/store/appStore';
import { calculateTotals, healthStatus } from '@/utils/finance';

const DashboardScreen: React.FC = () => {
  const expenses = useAppStore((s) => s.expenses);
  const profile = useAppStore((s) => s.profile);

  const totals = useMemo(() => calculateTotals(expenses), [expenses]);
  const health = useMemo(() => healthStatus(totals.available), [totals.available]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly snapshot</Text>
          <Text style={styles.metric}>Income: ${totals.totalIncome.toFixed(2)}</Text>
          <Text style={styles.metric}>Expenses: ${totals.totalExpenses.toFixed(2)}</Text>
          <Text style={styles.metric}>Available: ${totals.available.toFixed(2)}</Text>
          <View style={[styles.badge, styles[`badge_${health.tone}`]]}>
            <Text style={styles.badgeText}>{health.label}</Text>
          </View>
          <Text style={styles.healthCopy}>{health.message}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile at a glance</Text>
          {profile ? (
            <>
              <Text style={styles.metric}>Income range: {profile.incomeRange}</Text>
              <Text style={styles.metric}>Goal: {profile.primaryGoal}</Text>
              <Text style={styles.metric}>Risk comfort: {profile.riskLevel}</Text>
            </>
          ) : (
            <Text style={styles.subtle}>Set your profile in onboarding to personalize advice.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick actions</Text>
          <Text style={styles.metric}>• Add your main bills and one paycheck to start.</Text>
          <Text style={styles.metric}>• Check Advisor tab for tailored moves.</Text>
        </View>
      </View>
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
    gap: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.subtleText
  },
  metric: {
    fontSize: 16,
    color: colors.text
  },
  subtle: {
    fontSize: 14,
    color: colors.subtleText
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8
  },
  badge_success: {
    backgroundColor: '#DCFCE7'
  },
  badge_warning: {
    backgroundColor: '#FEF3C7'
  },
  badge_danger: {
    backgroundColor: '#FEE2E2'
  },
  badgeText: {
    color: colors.text,
    fontWeight: '700'
  },
  healthCopy: {
    marginTop: 4,
    color: colors.subtleText,
    fontSize: 14
  }
});

export default DashboardScreen;

