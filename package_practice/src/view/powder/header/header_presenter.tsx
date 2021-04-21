import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import CloseIcon from '../../../resource/asset/icon/meeting/close.svg';
import { HEADER_HEIGHT } from '../../../constant/common_constant';
import { MirrorButton, ChangeCameraButton } from '../button';

type ButtonType = 'exit' | 'mirror' | 'switch';

const HeaderBlock = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftButtonBlock = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  width: ${24}px;
  height: ${HEADER_HEIGHT}px;
  left: 16px;

  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const BackButtonView = styled.View`
  width: 24px;
  height: 24px;
  margin-top: 5px;
`;

const RightButtonView = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: ${24 + 16 + 24}px;
  height: ${HEADER_HEIGHT}px;
  right: 16px;

  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const HeaderText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

//<Text style={{ textAlign: 'center' }}>X</Text>
const BackButton = () => {
  return (
    <BackButtonView>
      <CloseIcon fill="white" />
    </BackButtonView>
  );
};

interface HeaderProps {
  title: string;
  onButtonTouched: (button_type: ButtonType) => void;
}

const HeaderPresenter = ({ title, onButtonTouched }: HeaderProps) => {
  const onButtonClicked = useCallback((btn_name: string) => {
    // toastRef.current!.fadeIn(btn_name);
  }, []);

  return (
    <>
      <LeftButtonBlock onPress={() => onButtonTouched('exit')}>
        <BackButton />
      </LeftButtonBlock>
      <HeaderBlock>
        <HeaderText>{title}</HeaderText>
      </HeaderBlock>
      <RightButtonView>
        <ChangeCameraButton width={24} height={24} callback={onButtonClicked} />
        <MirrorButton width={24} height={24} callback={onButtonClicked} />
      </RightButtonView>
    </>
  );
};

export default HeaderPresenter;
