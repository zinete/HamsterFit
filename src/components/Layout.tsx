/**
 * @ Author: ZhengHui
 * @ Create Time: 2023-05-21 22:01:21
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-01-20 12:53:15
 * @ Description:
 */

import React from 'react';
import {View, ViewProps} from 'react-native';
interface ILayout extends ViewProps {}

const LayoutWrapper: React.FC<ILayout> = props => {
  const {...other} = props;
  return <View>{props.children}</View>;
};

export default LayoutWrapper;
