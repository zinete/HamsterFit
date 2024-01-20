import {shorthands} from '@tamagui/shorthands';

import {themes, tokens} from '@tamagui/themes/v2';

import {createTamagui} from 'tamagui'; // or '@tamagui/core'
const appConfig = createTamagui({
  themes,

  tokens,

  shorthands,
});
export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
