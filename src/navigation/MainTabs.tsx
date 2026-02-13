import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SpeakingCoachScreen } from '../screens/SpeakingCoachScreen';
import { VocabularyScreen } from '../screens/VocabularyScreen';
import { WritingLabScreen } from '../screens/WritingLabScreen';
import { SimulatorScreen } from '../screens/SimulatorScreen';
import { appTheme } from '../theme/theme';

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appTheme.colors.card,
          borderTopColor: appTheme.colors.border,
          height: 72,
          paddingTop: 8
        },
        tabBarLabelStyle: { fontSize: 11 },
        tabBarActiveTintColor: appTheme.colors.gold,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Dashboard: 'analytics',
            Coach: 'record-voice-over',
            Writing: 'edit-note',
            Simulate: 'psychology',
            Vocabulary: 'auto-stories'
          };
          return <MaterialIcons name={iconMap[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Coach" component={SpeakingCoachScreen} />
      <Tab.Screen name="Writing" component={WritingLabScreen} />
      <Tab.Screen name="Simulate" component={SimulatorScreen} />
      <Tab.Screen name="Vocabulary" component={VocabularyScreen} />
    </Tab.Navigator>
  );
}
