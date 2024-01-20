/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 21:31:22
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-19 22:51:04
 * @ Description:
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/home';
import MineScreen from './screen/mine';
import MotionScreen from './screen/motion';
import SetupScreen from './screen/setup';

import Healthkit from './screen/motion/healthkit';
export type RootStackParamList = {
  Tabs: undefined;
  Start: undefined;
  Setup: undefined;
  Healthkit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="运动" component={MotionScreen} />
      <Tab.Screen name="我的" component={MineScreen} />
    </Tab.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Healthkit" component={Healthkit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
