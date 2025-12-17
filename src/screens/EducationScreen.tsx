import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

const tips = [
  'Start with a simple budget: money in, money out.',
  'Pay high-interest debt first to free up cash.',
  'Invest steadily for the long term; avoid “get rich quick” moves.'
];

const EducationScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Learn the basics</Text>
        {tips.map((tip) => (
          <View key={tip} style={styles.card}>
            <Text style={styles.tip}>{tip}</Text>
          </View>
        ))}
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
    borderColor: colors.border
  },
  tip: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22
  }
});

export default EducationScreen;

