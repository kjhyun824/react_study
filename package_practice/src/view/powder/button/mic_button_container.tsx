import React from 'react';
import { useObserver } from 'mobx-react';

import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import PowderAction from '../../../view_model/action/powder_action';
import useAction from '../../../util/mobx/hook/useAction';
import MicEnableIcon from '../../../resource/asset/icon/meeting/mic_enable.svg';
import MicDisableIcon from '../../../resource/asset/icon/meeting/mic_disable.svg';

import ButtonPresenter from './button_presenter';

interface Props {
  width: number;
  height: number;
  callback?: (data: any) => void;
}

const useMicStatus = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    mic_status: store!.powder_room.mic_status,
  }));
};

const MicButtonContainer = ({ width, height, callback }: Props) => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const { mic_status } = useMicStatus();

  const ButtonIcon = mic_status ? MicEnableIcon : MicDisableIcon;
  return (
    <ButtonPresenter
      width={width}
      height={height}
      onPress={() => {
        powder_action.changeMicStatus();
        callback && callback('mic');
      }}
    >
      <ButtonIcon width={30} height={30} fill={mic_status ? '#ffa717' : 'white'} />
    </ButtonPresenter>
  );
};

export default MicButtonContainer;
