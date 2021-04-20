import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Orientation from 'react-native-orientation-locker';
import { SampleBlock, SampleText } from '../../styles/style';

import {
  getStatusBarHeight,
  getBottomNavigatorHeight,
} from '../../util/device_screen';

const PowderRoomBlock = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const StatusBarBlock = styled.View`
  height: ${(props) => getStatusBarHeight()}px;
  background-color: #3a3a3a;
`;

/*
const HeaderBlock = styled.View`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: #353333;
`;

const ContentBlock =
  styled.View <
  { bottom_include: boolean } >
  `
  height: ${(props) => {
    return getContentHeight(props.bottom_include) - HEADER_HEIGHT;
  }}px;
  background-color: black; //353333;
`;
*/

const BottomNavigatorBlock =
  styled.View <
  { bottom_include: boolean } >
  `
  height: ${(props) => {
    return getBottomNavigatorHeight(props.bottom_include);
  }}px;
  background-color: lightblue;
`;

const PowderPresenter = () => {
  useLayoutEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const bottom_include = false;

  return (
    <PowderRoomBlock>
      <StatusBarBlock>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          animated={true}
          translucent={true}
        />
      </StatusBarBlock>
      <SampleBlock>
        <SampleText>Welcome to Powder!!!</SampleText>
      </SampleBlock>
      <BottomNavigatorBlock bottom_include={bottom_include} />
    </PowderRoomBlock>
  );
};

export default PowderPresenter;
