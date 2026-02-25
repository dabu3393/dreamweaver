// app/+not-found.tsx

import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🌙</Text>
        <Text style={styles.title}>Lost in the dark</Text>
        <Text style={styles.subtitle}>This page doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go home →</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.midnight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
  },
  emoji: { fontSize: 48 },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes['2xl'],
    color: colors.pearl,
    fontStyle: 'italic',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.nebula,
  },
  link: { marginTop: spacing[4] },
  linkText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.gold,
  },
});
