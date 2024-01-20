/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 20:47:10
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-20 15:52:11
 * @ Description:
 */

import React from 'react';
import {TamaguiProvider, createTamagui} from 'tamagui';

// some nice defaults:
import {config} from '@tamagui/config/v2';

// you usually export this from a tamagui.config.ts file:
// this can be as simple as an empty object
const tamaguiConfig = createTamagui(config);

// this makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

import Root from './src/Root';

export default () => (
  <TamaguiProvider config={tamaguiConfig}>
    <Root />
  </TamaguiProvider>
);
