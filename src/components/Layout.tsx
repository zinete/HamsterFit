/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 22:01:21
 * @ Modified by: ZhengHui
 * @ Modified time: 2023-05-25 21:26:04
 * @ Description:
 */

import {Layout, LayoutProps} from '@ui-kitten/components';
import React from 'react';

interface ILayout extends LayoutProps {
  padding?: {
    horizontal?: number;
    vertical?: number;
  };
}

const LayoutWrapper: React.FC<ILayout> = props => {
  return (
    <Layout
      style={{
        paddingHorizontal: props.padding?.horizontal,
        paddingVertical: props.padding?.vertical,
      }}
      level={props.level}>
      {props.children}
    </Layout>
  );
};

export default LayoutWrapper;
