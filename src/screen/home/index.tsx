/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 21:31:52
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-20 12:53:19
 * @ Description:
 */

import * as React from 'react';

import LayoutWrapper from '../../components/Layout';
import {Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Root';

interface IHomeScreenProps extends NativeStackScreenProps<RootStackParamList> {}
const HomeScreen = ({navigation}: IHomeScreenProps) => {
  return (
    <LayoutWrapper>
      <Button
        title=" Go to Setup Page"
        onPress={() => navigation.navigate('Setup')}
      />
    </LayoutWrapper>
  );
};

export default HomeScreen;
