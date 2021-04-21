import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

const ButtonBlock = styled.TouchableOpacity`
  height: 46px;
  width: 46px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonBackground = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;

  background-color: #3a3a3a;
  border-radius: 4px;
  opacity: 0.3;
`;

interface Props {
  width: number;
  height: number;
  onPress: () => void;
  children: any;
}

const ButtonPresenter = ({ width, height, onPress, children }: Props) => {
  return (
    <ButtonBlock
      onPress={(e: GestureResponderEvent) => {
        onPress();
      }}
    >
      <ButtonBackground />
      {children}
    </ButtonBlock>
  );
};

export default ButtonPresenter;
