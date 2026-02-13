import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MainTabs } from './src/navigation/MainTabs';
import { appTheme } from './src/theme/theme';
import { FluentoProvider } from './src/state/FluentoContext';

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: appTheme.colors.background,
    card: appTheme.colors.card,
    text: appTheme.colors.text,
    border: appTheme.colors.border,
    primary: appTheme.colors.primary
  }
};

export default function App() {
  return (
    <FluentoProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <MainTabs />
      </NavigationContainer>
    </FluentoProvider>
  );
}
