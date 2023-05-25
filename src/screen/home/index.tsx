/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 21:31:52
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-25 22:04:24
 * @ Description:
 */

import * as React from 'react';

import {Button} from '@ui-kitten/components';
import LayoutWrapper from '../../components/Layout';

const HomeScreen = ({navigation}: any) => {
  return (
    <LayoutWrapper padding={{horizontal: 16}} level={'1'}>
      <Button onPress={() => navigation.navigate('Setup')}>
        Go to Setup Page
      </Button>
    </LayoutWrapper>
  );
};

export default HomeScreen;
