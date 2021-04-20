import React, { useCallback, useRef } from 'react';
import styled from 'styled-components/native';
import LocalStream from './local_stream';
import PowderToast from '../toast';
import { CameraButton, MicButton, JoinButton } from '../button';

const MainBlock = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const LocalStreamBlock = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// height: 46px;
// width: ${46 + 24 + 46}px;

const ToastBlock = styled.View`
  width: 44.44%;
  height: 30px;
  margin-bottom: 20px;
`;

const DeviceButtonBlock = styled.View`
  height: 46px;
  width: ${46 + 24 + 46}px;

  margin-bottom: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

// width: 207px;
const TextBlock = styled.View`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// font-family: NotoSansCJKkr-Medium;
const NickNameText = styled.Text`
  font-family: NotoSansCJKkr-Bold;
  font-size: 14px;
  color: #ffb00b;
  text-align: center;
`;

const InstructionText = styled.Text`
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
`;

const JoinButtonBlock = styled.View`
  margin-top: 10px;
  margin-bottom: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type ButtonType = 'mic' | 'camera' | 'join';
interface ContentProps {
  onButtonTouched: (button_type: ButtonType) => void;
  user_name: string;
}

const ContentPresenter = ({ onButtonTouched, user_name }: ContentProps) => {
  const toastRef = useRef();

  const onButtonClicked = useCallback((btn_name: string) => {
    // toastRef.current!.fadeIn(btn_name);
  }, []);

  return (
    <>
      <MainBlock>
        <LocalStreamBlock>
          <LocalStream />
        </LocalStreamBlock>
        <ToastBlock>
          <PowderToast ref={toastRef} />
        </ToastBlock>
        <DeviceButtonBlock>
          <CameraButton width={46} height={46} callback={onButtonClicked} />
          <MicButton width={46} height={46} callback={onButtonClicked} />
        </DeviceButtonBlock>
        <TextBlock>
          <NickNameText>
            {`${user_name === '' ? '테스트 중' : user_name} 님`} <InstructionText>, {`회의실 입장 전`}</InstructionText>
          </NickNameText>
          <InstructionText>{'마이크와 카메라 장치를 점검하세요.'}</InstructionText>
        </TextBlock>
        <JoinButtonBlock>
          <JoinButton width={288} height={40} callback={onButtonTouched} />
        </JoinButtonBlock>
      </MainBlock>
    </>
  );
};

export default ContentPresenter;
