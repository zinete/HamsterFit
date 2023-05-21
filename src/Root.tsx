/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 21:31:22
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-21 21:50:28
 * @ Description:
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from './screen/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MineScreen from './screen/Mine';

const Stack = createNativeStackNavigator();

const screenNames = {
  Home: 'Home',
  Mine: 'Mine',
};

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={screenNames.Home} component={HomeScreen} />
        <Stack.Screen name={screenNames.Mine} component={MineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
