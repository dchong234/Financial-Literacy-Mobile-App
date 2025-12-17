import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { colors } from '@/theme/colors';
import { incomeRanges, RiskLevel } from '@/types/finance';
import { useAppStore } from '@/store/appStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const riskLevels: RiskLevel[] = ['Low', 'Medium', 'High'];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const existingProfile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);

  const [incomeRange, setIncomeRange] = useState(existingProfile?.incomeRange ?? incomeRanges[1]);
  const [primaryGoal, setPrimaryGoal] = useState(existingProfile?.primaryGoal ?? '');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(existingProfile?.riskLevel ?? 'Medium');
  const [error, setError] = useState('');

  const isValid = useMemo(() => primaryGoal.trim().length > 0, [primaryGoal]);

  const handleContinue = () => {
    if (!isValid) {
      setError('Tell us your main goal (e.g., pay debt, save for emergency).');
      return;
    }
    setProfile({
      incomeRange,
      primaryGoal: primaryGoal.trim(),
      riskLevel
    });
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Welcome to your money coach</Text>
          <Text style={styles.subtitle}>
            Track spending, learn the basics, and get simple advice to feel confident about your
            money.
          </Text>

          <View style={styles.block}>
            <Text style={styles.label}>Income range</Text>
            <View style={styles.optionRow}>
              {incomeRanges.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[styles.option, incomeRange === range && styles.optionSelected]}
                  onPress={() => setIncomeRange(range)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      incomeRange === range && styles.optionTextSelected
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>Main goal</Text>
            <TextInput
              placeholder="Pay off debt, build emergency fund, invest monthly..."
              value={primaryGoal}
              onChangeText={setPrimaryGoal}
              style={styles.input}
              placeholderTextColor={colors.subtleText}
            />
            {!!error && <Text style={styles.error}>{error}</Text>}
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>Comfort with risk</Text>
            <View style={styles.optionRow}>
              {riskLevels.map((risk) => (
                <TouchableOpacity
                  key={risk}
                  style={[styles.option, riskLevel === risk && styles.optionSelected]}
                  onPress={() => setRiskLevel(risk)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      riskLevel === risk && styles.optionTextSelected
                    ]}
                  >
                    {risk}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Save and continue</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 20
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtleText,
    lineHeight: 22
  },
  block: {
    gap: 12
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E8F1FF'
  },
  optionText: {
    color: colors.text,
    fontSize: 14
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16
  },
  error: {
    color: colors.danger,
    fontSize: 14
  }
});

export default OnboardingScreen;

