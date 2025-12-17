import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { useAppStore } from '@/store/appStore';
import { calculateTotals, buildAdvisorSuggestions } from '@/utils/finance';

const AdvisorScreen: React.FC = () => {
  const expenses = useAppStore((s) => s.expenses);
  const profile = useAppStore((s) => s.profile);

  const totals = useMemo(() => calculateTotals(expenses), [expenses]);
  const suggestions = useMemo(() => buildAdvisorSuggestions(profile, totals), [profile, totals]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Advisor</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Suggestions for you</Text>
          {suggestions.map((item) => (
            <View key={item} style={styles.suggestion}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.body}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How this works</Text>
          <Text style={styles.body}>
            These are rule-based tips using your profile and spending. Later we can swap in an LLM
            via a secure backend for richer advice.
          </Text>
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
    gap: 12
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
    gap: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.subtleText
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
    flexShrink: 1
  },
  suggestion: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start'
  },
  bullet: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 2
  }
});

export default AdvisorScreen;

