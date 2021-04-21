import { useObserver } from 'mobx-react';
import React from 'react';
import ButtonPresenter from './button_presenter';

import useAction from '../../../util/mobx/hook/useAction';
import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import CameraEnableIcon from '../../../resource/asset/icon/meeting/camera_enable.svg';
import CameraDisableIcon from '../../../resource/asset/icon/meeting/camera_disable.svg';
import PowderAction from '../../../view_model/action/powder_action';

interface Props {
  width: number;
  height: number;
  callback?: (data: any) => void;
}

const useCameraStatus = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    camera_status: store!.powder_room.camera_status,
  }));
};

const CameraButtonContainer = ({ width, height, callback }: Props) => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const { camera_status } = useCameraStatus();

  const ButtonIcon = camera_status ? CameraEnableIcon : CameraDisableIcon;
  return (
    <ButtonPresenter
      width={width}
      height={height}
      onPress={() => {
        powder_action.changeCameraStatus();
        callback && callback('camera');
      }}
    >
      <ButtonIcon width={30} height={30} fill={camera_status ? '#ffa717' : 'white'} />
    </ButtonPresenter>
  );
};

export default CameraButtonContainer;
