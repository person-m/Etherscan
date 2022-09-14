import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery } from '@apollo/client';
import { GET_THEME } from './graphql/reactivities/ThemeVariable';
import i18n from './utils/i18n';
import { SplashScreen, LookupScreen, QRScanScreen, TransactionInfoScreen } from './screens';

const LookupStack = createStackNavigator();
function LookupStackScreen(theme: any) {
  return () => (
    <LookupStack.Navigator>
      <LookupStack.Screen
        name="Lookup"
        component={LookupScreen}
        options={{ headerShown: false }}
      />
      <LookupStack.Screen
        name="TransactionInfo"
        component={TransactionInfoScreen}
        options={{ headerShown: false }}
      />
    </LookupStack.Navigator>
  );
}

const QRScanStack = createStackNavigator();
function QRScanStackScreen(theme: any) {
  return () => (
    <QRScanStack.Navigator>
      <QRScanStack.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{ headerShown: false }}
      />
    </QRScanStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function AppNavigation() {

  const _theme = useQuery(GET_THEME);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // SplashScreen
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'LookupScreen'}
        screenOptions={{
          tabBarActiveTintColor: _theme.data.theme.textColorPrimary,
          tabBarInactiveTintColor: _theme.data.theme.textColorSecondary,
          tabBarShowLabel: true,
          tabBarStyle: { backgroundColor: _theme.data.theme.bgColorThird },
        }}
      >
        <Tab.Group
          screenOptions={{
            headerStyle: {
              backgroundColor: _theme.data.theme.bgColorThird
            },
            headerTintColor: _theme.data.theme.textColorPrimary,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
            tabBarLabelPosition: 'beside-icon',
          }}
        >
          <Tab.Screen
            name="LookupScreen"
            component={LookupStackScreen(_theme.data.theme)}
            options={{
              title: i18n.t('Header.Lookup'),
              tabBarLabel: i18n.t('BottomTab.Lookup'),
            }}
          />
          <Tab.Screen
            name="QRScanScreen"
            component={QRScanStackScreen(_theme.data.theme)}
            options={{
              title: i18n.t('Header.QRScan'),
              tabBarLabel: i18n.t('BottomTab.QRScan'),
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 15,
  },
  tabBarIconStyle: {
    display: 'none',
  }
})