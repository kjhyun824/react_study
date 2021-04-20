import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Modal from 'react-native-modal';
import ExtraDimension from 'react-native-extra-dimensions-android';

export enum PowderModalType {
  EXIT_POWDER = 0,
  TOO_MANY_PARTICIPANTS = 1,
  ALREADY_FINISHED = 2,
}

const Block = styled.View`
  width: 296px;
  height: 178px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const TextBlock = styled.View`
  width: 296px;
  height: 130px;

  display: flex;
  justify-content: center;
`;

const InstructionText = styled.Text`
  font-family: NotoSansCJKkr-Medium;

  letter-spacing: 0;
  text-align: center;
`;

const MainText = styled(InstructionText)`
  font-size: 16px;
  color: #3a3a3a;
`;

const SubText = styled(InstructionText)<{ scale: 'normal' | 'small' }>`
  margin-top: ${(props) => {
    const margin = props.scale === 'normal' ? 10 : 4;
    return Platform.OS === 'ios' ? margin : -margin;
  }}px;
  font-size: ${(props) => (props.scale === 'normal' ? 12 : 10)}px;
  color: #919ba4;
`;

const ButtonBlock = styled.View`
  width: 296px;
  height: 48px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity<{ index: number; length: number }>`
  flex: 1;
  width: 148px;
  height: 48px;
  border-color: #e3e7eb;
  border-top-width: 1px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: ${(props) => (props.index === 0 ? 8 : 0)}px;
  border-bottom-right-radius: ${(props) => (props.index === props.length - 1 ? 8 : 0)}px;
  background-color: ${(props) => (props.index === props.length - 1 ? '#ffb305' : '#ffffff')};
`;

const ButtonText = styled(InstructionText)<{ index: number; length: number }>`
  font-size: 13px;
  color: ${(props) => (props.index === props.length - 1 ? '#ffffff' : '#3a3a3a')};
`;

const getMainTitle = (modal_type: PowderModalType) => {
  let title = '';
  switch (modal_type) {
    case PowderModalType.EXIT_POWDER:
      title = '종료하시겠습니까?';
      break;
    case PowderModalType.TOO_MANY_PARTICIPANTS:
      title = '회의실 입장 실패';
      break;
    case PowderModalType.ALREADY_FINISHED:
      title = '이미 종료된 회의입니다.';
  }
  return title;
};

const getSubTitle = (modal_type: PowderModalType) => {
  let title = '';
  switch (modal_type) {
    case PowderModalType.EXIT_POWDER:
      title = '종료 시 메인 페이지로 이동합니다.';
      break;
    case PowderModalType.TOO_MANY_PARTICIPANTS:
      title = `해당 회의실은 10명으로 참여자가 제한되었습니다.
      모두 사용 중이므로 입장할 수 없습니다.`;
      break;
    case PowderModalType.ALREADY_FINISHED:
      title = '';
  }
  return title;
};

interface ButtonProps {
  index: number;
  length: number;
  button_text: string;
  onPress: () => void;
}

const PowderButton = ({ index, length, button_text, onPress }: ButtonProps) => {
  return (
    <Button index={index} length={length} onPress={onPress}>
      <ButtonText index={index} length={length}>
        {button_text}
      </ButtonText>
    </Button>
  );
};

const getPowderButtons = (modal_type: PowderModalType = PowderModalType.EXIT_POWDER) => {
  const ret = [];
  if (modal_type === PowderModalType.EXIT_POWDER) {
    ret.push({
      title: '취소',
    });
  }

  ret.push({
    title: `${modal_type === PowderModalType.EXIT_POWDER ? '종료' : '확인'}`,
  });
  return ret;
};

interface ModalProps {
  onConfirm: () => void;
}

/*
<MainText>종료하시겠습니까?</MainText>
<SubText>종료 시 메인페이지로 이동합니다.</SubText>
*/

const PowderModal = forwardRef(({ onConfirm }: ModalProps, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [modal_type, setPowderModalType] = useState<PowderModalType>(PowderModalType.EXIT_POWDER);

  useImperativeHandle(ref, () => ({
    showModal(powder_modal_type: PowderModalType = PowderModalType.EXIT_POWDER) {
      setPowderModalType(powder_modal_type);
      setVisible(() => true);
    },
  }));

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimension.get('REAL_WINDOW_HEIGHT');

  return (
    <>
      <Modal
        isVisible={visible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        useNativeDriver={true}
        hasBackdrop={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => {
          setVisible(() => false);
        }}
        onBackdropPress={() => {
          if (modal_type === PowderModalType.EXIT_POWDER) {
            setVisible(() => false);
          }
        }}
        statusBarTranslucent={true}
        style={styles.modal_style}
      >
        <Block>
          <TextBlock>
            <MainText>{getMainTitle(modal_type)}</MainText>
            <SubText scale={modal_type === PowderModalType.TOO_MANY_PARTICIPANTS ? 'small' : 'normal'}>
              {getSubTitle(modal_type)}
            </SubText>
          </TextBlock>
          <ButtonBlock>
            {getPowderButtons(modal_type).map((button, index, buttons) => {
              return (
                <PowderButton
                  key={index}
                  index={index}
                  length={buttons.length}
                  button_text={button.title}
                  onPress={() => {
                    setVisible((prev) => false);
                    if (index === buttons.length - 1) {
                      onConfirm();
                    }
                  }}
                />
              );
            })}
          </ButtonBlock>
        </Block>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  modal_style: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PowderModal;
