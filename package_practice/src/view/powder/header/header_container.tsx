import React, { useCallback, useEffect, useRef } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import HeaderPresenter from './header_presenter';
import { BackHandler } from 'react-native';
import { ApplicationPage } from '../../../constant/navigation_constant';
import PowderModal, { PowderModalType } from '../modal/powder_modal';
import useAction from '../../../util/mobx/hook/useAction';
import PowderAction from '../../../view_model/action/powder_action';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import useStore from '../../../util/mobx/hook/useStore';
import { useObserver } from 'mobx-react';
import { MeetingErrorCode } from '@meeting/meeting-core';

interface HeaderProps {
  title: string;
}

type ButtonType = 'exit' | 'mirror' | 'switch';

const useCoreError = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    join_user_error: store?.powder_room.join_user_error,
  }));
};

const HeaderContainer = ({ title }: HeaderProps) => {
  const navigation: NavigationProp<any> = useNavigation();
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const { join_user_error } = useCoreError();
  const modal_ref = useRef(null);
  const onButtonTouched = useCallback((button_type: ButtonType) => {
    switch (button_type) {
      case 'exit':
        modal_ref.current!.showModal(PowderModalType.EXIT_POWDER);
        break;
      case 'mirror':
        powder_action.changeMirrorMode();
        break;
      case 'switch':
        powder_action.switchCamera();
        break;
    }

    return true;
  }, []);

  const exitCallback = () => onButtonTouched('exit');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitCallback);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitCallback);
    };
  }, []);

  useEffect(() => {
    if (join_user_error) {
      const error_code: MeetingErrorCode = join_user_error.getErrorCode();

      switch (error_code) {
        case MeetingErrorCode.TOO_MANY_PARTICIPANTS:
          modal_ref.current!.showModal(PowderModalType.TOO_MANY_PARTICIPANTS);
          break;
        case MeetingErrorCode.NO_SUCH_ROOM:
          modal_ref.current!.showModal(PowderModalType.ALREADY_FINISHED);
          break;
        default:
          console.warn(join_user_error);
          modal_ref.current!.showModal(PowderModalType.ALREADY_FINISHED);
          break;
      }
    }
  }, [join_user_error]);

  const onModalConfirmed = useCallback(() => {
    navigation.navigate(ApplicationPage.LandingPage);
    powder_action.disconnect();
    powder_action.resetCameraDeviceState();
  }, []);

  return (
    <>
      <PowderModal ref={modal_ref} onConfirm={onModalConfirmed} />
      <HeaderPresenter title={title} onButtonTouched={onButtonTouched} />
    </>
  );
};

export default HeaderContainer;
