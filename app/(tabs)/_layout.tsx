// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.stardust,
        tabBarStyle: {
          backgroundColor: colors.dusk,
          borderTopColor: colors.moonmist,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon emoji="✦" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <TabIcon emoji="📚" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  return (
    // @ts-ignore — emoji as tab icon, fine for now
    <text style={{ fontSize: 18, opacity: color === colors.gold ? 1 : 0.5 }}>{emoji}</text>
  );
}
