import React, { useCallback, useLayoutEffect } from 'react';
import { useObserver } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ContentPresenter from './content_presenter';
import useStore from '../../../util/mobx/hook/useStore';
import useAction from '../../../util/mobx/hook/useAction';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import { ApplicationPage } from '../../../constant/navigation_constant';
import PowderAction from '../../../view_model/action/powder_action';
import { ResponseType } from '../../../constant/common_constant';

type ButtonType = 'mic' | 'camera' | 'join';

const useUserName = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    user_name: store!.user_name,
    response_status: store!.response_status,
  }));
};

const ContentContainer = () => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const navigation = useNavigation();
  const { user_name, response_status } = useUserName();

  useLayoutEffect(() => {
    powder_action.init();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (response_status === ResponseType.SUCCESS) {
        navigation.navigate(ApplicationPage.MeetingPage);
      } else if (response_status === ResponseType.FAILED) {
        console.log('failed to join room');
      }
      powder_action.resetStatus();
    }, [response_status]),
  );

  const onButtonTouched = useCallback((button_type: ButtonType) => {
    switch (button_type) {
      case 'mic':
        powder_action.changeMicStatus();
        break;
      case 'camera':
        powder_action.changeCameraStatus();
        break;
      case 'join':
        powder_action.requestJoinRoom();
        break;
    }
  }, []);

  return <ContentPresenter onButtonTouched={onButtonTouched} user_name={user_name} />;
};

export default ContentContainer;
