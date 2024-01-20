/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-01-19 22:29:18
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-20 16:46:10
 * @ Description: 测试 Healthkit
 */

import Healthkit, {
  HKAuthorizationRequestStatus,
  HKQuantityTypeIdentifier,
  HKStatisticsOptions,
  HKWorkoutActivityType,
  HKCategoryTypeIdentifier,
  useHealthkitAuthorization,
  queryQuantitySamplesWithAnchor,
  saveWorkoutRoute,
  saveWorkoutSample,
} from '@kingstinct/react-native-healthkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';

import type {
  HealthkitReadAuthorization,
  HealthkitWriteAuthorization,
} from '@kingstinct/react-native-healthkit';

import {generateWorkoutSamples} from '../../utils/testData';
import {Button, Text, ListItem, useTheme} from 'tamagui';
import {Accessibility, Award, Plus} from '@tamagui/lucide-icons';

dayjs.extend(relativeTime);

// feel free to add more :)
const LATEST_QUANTITIES_TO_SHOW = [
  {
    icon: 'battery-heart-variant' as const,
    title: 'Resting Heart Rate',
    identifier: HKQuantityTypeIdentifier.restingHeartRate,
  },
  {
    icon: 'lungs' as const,
    title: 'Respiratory Rate',
    identifier: HKQuantityTypeIdentifier.respiratoryRate,
  },
  {
    icon: 'account-heart' as const,
    title: 'Walking Heart Rate Average',
    identifier: HKQuantityTypeIdentifier.walkingHeartRateAverage,
  },
  {
    icon: 'needle' as const,
    title: 'Blood Glucose',
    identifier: HKQuantityTypeIdentifier.bloodGlucose,
  },
  {
    icon: 'heart-pulse',
    title: 'Heart rate',
    identifier: HKQuantityTypeIdentifier.heartRate,
    unit: 'count/min',
  },
  {
    icon: 'water-percent',
    title: 'Oxygen saturation',
    identifier: HKQuantityTypeIdentifier.oxygenSaturation,
    unit: '%',
  },
  {
    icon: 'percent',
    title: 'Body Fat',
    identifier: HKQuantityTypeIdentifier.bodyFatPercentage,
    unit: '%',
  },
];

// feel free to add more :)
const TODAY_STATS_TO_SHOW = [
  {
    identifier: HKQuantityTypeIdentifier.restingHeartRate,
    option: HKStatisticsOptions.discreteAverage,
    icon: 'heart',
    title: 'Resting Heart Rate',
    unit: 'count/min' as const,
  },
  {
    identifier: HKQuantityTypeIdentifier.stepCount,
    option: HKStatisticsOptions.cumulativeSum,
    icon: 'walk',
    title: 'Steps',
    unit: 'count' as const,
  },
  {
    identifier: HKQuantityTypeIdentifier.activeEnergyBurned,
    option: HKStatisticsOptions.cumulativeSum,
    icon: 'fire',
    title: 'Active Energy Burned',
    unit: 'kcal' as const,
  },
  {
    identifier: HKQuantityTypeIdentifier.distanceWalkingRunning,
    option: HKStatisticsOptions.cumulativeSum,
    icon: 'walk',
    title: 'Distance Walking/Running',
    unit: 'km' as const,
  },
  {
    identifier: HKQuantityTypeIdentifier.flightsClimbed,
    option: HKStatisticsOptions.cumulativeSum,
    icon: 'stairs',
    title: 'Flights Climbed',
    unit: 'count' as const,
  },
];

const SOURCES_TO_SHOW = [
  {
    identifier: HKQuantityTypeIdentifier.restingHeartRate,
    icon: 'heart',
    title: 'Resting Heart Rate',
  },
  {
    identifier: HKQuantityTypeIdentifier.stepCount,
    icon: 'walk',
    title: 'Steps',
  },
  {
    identifier: HKCategoryTypeIdentifier.sexualActivity,
    icon: 'bed',
    title: 'Sexual activity',
  },
];

const saveableCountTypes: readonly HKQuantityTypeIdentifier[] = [
  HKQuantityTypeIdentifier.stepCount,
  HKQuantityTypeIdentifier.pushCount,
];

const saveableMassTypes: readonly HKQuantityTypeIdentifier[] = [
  HKQuantityTypeIdentifier.dietaryFatTotal,
  HKQuantityTypeIdentifier.dietaryCarbohydrates,
  HKQuantityTypeIdentifier.dietaryProtein,
];

const saveableWorkoutStuff: readonly HealthkitWriteAuthorization[] = [
  'HKQuantityTypeIdentifierDistanceWalkingRunning',
  'HKQuantityTypeIdentifierActiveEnergyBurned',
  'HKWorkoutTypeIdentifier',
  'HKWorkoutRouteTypeIdentifier',
  HKQuantityTypeIdentifier.heartRate,
  HKQuantityTypeIdentifier.runningSpeed,
];

const readPermissions: readonly HealthkitReadAuthorization[] = [
  HKQuantityTypeIdentifier.activeEnergyBurned,
  HKQuantityTypeIdentifier.distanceDownhillSnowSports,
  HKQuantityTypeIdentifier.distanceDownhillSnowSports,
  HKQuantityTypeIdentifier.basalEnergyBurned,
  HKQuantityTypeIdentifier.restingHeartRate,
  'HKCharacteristicTypeIdentifierActivityMoveMode',
  'HKWorkoutTypeIdentifier',
  'HKWorkoutRouteTypeIdentifier',
  'HKQuantityTypeIdentifierStepCount',
  'HKWorkoutTypeIdentifier',
  HKQuantityTypeIdentifier.distanceCycling,
  HKQuantityTypeIdentifier.distanceSwimming,
  HKQuantityTypeIdentifier.distanceWalkingRunning,
  HKQuantityTypeIdentifier.oxygenSaturation,
  HKQuantityTypeIdentifier.heartRate,
  HKQuantityTypeIdentifier.heartRateVariabilitySDNN,
  'HKDataTypeIdentifierHeartbeatSeries',
  HKQuantityTypeIdentifier.swimmingStrokeCount,
  HKQuantityTypeIdentifier.bodyFatPercentage,
  HKQuantityTypeIdentifier.bodyMass,
  ...LATEST_QUANTITIES_TO_SHOW.map(entry => entry.identifier),
  ...TODAY_STATS_TO_SHOW.map(entry => entry.identifier),
  ...SOURCES_TO_SHOW.map(entry => entry.identifier),
  ...saveableMassTypes,
  ...saveableCountTypes,
];

type ItemType = {
  onPress: () => Promise<void> | void;
  title: string;
  des: string;
  icon: any;
  disabled?: boolean;
};

const HealthkitPage = () => {
  const [status, request] = useHealthkitAuthorization(readPermissions, [
    HKQuantityTypeIdentifier.bodyMass,
    ...saveableCountTypes,
    ...saveableMassTypes,
    ...saveableWorkoutStuff,
  ]);
  const theme = useTheme();
  const [canAccessProtectedData, setAccessProtectedData] =
    useState<boolean>(false);

  const saveWorkout = useCallback(async () => {
    const {startTime, samples, locationSamples} = generateWorkoutSamples();

    if (startTime && samples.length) {
      try {
        const workoutUUID = await saveWorkoutSample(
          HKWorkoutActivityType.running,
          samples,
          new Date(startTime),
        );

        if (workoutUUID && locationSamples.length) {
          await saveWorkoutRoute(workoutUUID, locationSamples);
        }
      } catch (error) {
        console.error('Error Saving Activity', error);
      }
    }
  }, []);

  useEffect(() => {
    Healthkit.isProtectedDataAvailable()
      .then(setAccessProtectedData)
      .catch(() => setAccessProtectedData(false));
  }, []);

  const anchor = useRef<string>();

  const itemsData: ItemType[] = [
    {
      title: '健康权限',
      des: canAccessProtectedData ? '已授权' : '未授权',
      icon: <Accessibility size="$2" color={'yellowgreen'} />,
      onPress: () => {},
    },
    {
      title: '获取步数',
      des: '获取步数',
      icon: <Plus size="$2" color={'skyblue'} />,
      onPress: async () => {
        const res = await queryQuantitySamplesWithAnchor(
          HKQuantityTypeIdentifier.stepCount,
          {
            limit: 10,
          },
        );
        anchor.current = res.newAnchor;
        console.log(res, '步数');
        Alert.alert(JSON.stringify(res));
      },
    },
    {
      title: '保存测试健康数据',
      des: '保存测试健康数据',
      icon: <Award size="$2" color={'$gray10Dark'} />,
      onPress: saveWorkout,
      disabled: true,
    },
  ];

  const renderItems = (v: ItemType) => {
    return (
      <ListItem
        disabled={v?.disabled}
        onPress={v.onPress}
        subTitle={v.title}
        iconAfter={v.icon}>
        <Text> {v.des}</Text>
      </ListItem>
    );
  };
  return status !== HKAuthorizationRequestStatus.unnecessary ? (
    <View style={styles.buttonWrapper}>
      <Button backgroundColor={theme.color1} onPress={request}>
        Authorize
      </Button>
    </View>
  ) : (
    <FlatList data={itemsData} renderItem={v => renderItems(v.item)} />
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1, width: '100%'},
  buttonWrapper: {paddingTop: 100},
});

export default HealthkitPage;
