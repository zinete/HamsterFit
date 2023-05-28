/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 21:31:52
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-27 19:30:53
 * @ Description:
 */

import * as React from 'react';

import {Button, Layout} from '@ui-kitten/components';
import LayoutWrapper from '../../components/Layout';

const HomeScreen = ({navigation}: any) => {
  return (
    <LayoutWrapper padding={{horizontal: 16}} level={'1'}>
      <Layout level="2" style={{gap: 10, marginTop: 10}}>
        <Button onPress={() => navigation.navigate('Setup')}>
          Go to Setup Page
        </Button>
      </Layout>
    </LayoutWrapper>
  );
};

export default HomeScreen;
