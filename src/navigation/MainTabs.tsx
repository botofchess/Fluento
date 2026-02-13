import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SpeakingCoachScreen } from '../screens/SpeakingCoachScreen';
import { VocabularyScreen } from '../screens/VocabularyScreen';
import { AcademyScreen } from '../screens/AcademyScreen';
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
        tabBarActiveTintColor: appTheme.colors.gold,
        tabBarInactiveTintColor: appTheme.colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Dashboard: 'analytics',
            Coach: 'record-voice-over',
            Vocabulary: 'auto-stories',
            Academy: 'workspace-premium'
          };
          return <MaterialIcons name={iconMap[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Coach" component={SpeakingCoachScreen} />
      <Tab.Screen name="Vocabulary" component={VocabularyScreen} />
      <Tab.Screen name="Academy" component={AcademyScreen} />
    </Tab.Navigator>
  );
}
