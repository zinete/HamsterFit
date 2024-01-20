/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-25 21:57:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-20 12:53:33
 * @ Description:
 */

import React from 'react';

import LayoutWrapper from '../../components/Layout';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Root';
import {Button} from 'react-native';

interface IMotionScreenProps
  extends NativeStackScreenProps<RootStackParamList> {}
const MotionScreen = ({navigation}: IMotionScreenProps) => {
  return (
    <LayoutWrapper>
      <Button onPress={() => navigation.navigate('Healthkit')} title="go" />
    </LayoutWrapper>
  );
};

export default MotionScreen;
