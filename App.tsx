/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 20:47:10
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-21 21:45:14
 * @ Description:
 */

import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Root from './src/Root';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Root />
    </ApplicationProvider>
  </>
);
