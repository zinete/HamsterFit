/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-25 21:57:30
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-28 21:08:16
 * @ Description:
 */

import {Alert} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import LayoutWrapper from '../../components/Layout';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

const initHealthKit = () => {
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }
  });
};

// 读取健康数据
const readHealthData = () => {
  const options = {
    startDate: new Date(2023, 1, 1).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
      // log

      Alert.alert('获取健康数据', JSON.stringify(results));
      console.log(results, callbackError);
    },
  );
};
const MotionScreen = () => {
  return (
    <LayoutWrapper padding={{horizontal: 16}} level="1">
      <Button onPress={() => initHealthKit()}>获取健康权限</Button>
      <Button onPress={() => readHealthData()}>读取健康数据</Button>
    </LayoutWrapper>
  );
};

export default MotionScreen;
