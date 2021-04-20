import React from 'react';
import ButtonPresenter from './button_presenter';

import useAction from '../../../util/mobx/hook/useAction';
import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import CameraIcon from '../../../resource/asset/icon/meeting/change_camera_direction.svg';
import PowderAction from '../../../view_model/action/powder_action';

interface Props {
  width: number;
  height: number;
  callback?: (data: any) => void;
}

const ChangeCameraButtonContainer = ({ width, height, callback }: Props) => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));

  return (
    <ButtonPresenter
      width={width}
      height={height}
      onPress={() => {
        powder_action.switchCamera();
        callback && callback('mirror');
      }}
    >
      <CameraIcon width={width} height={height} />
    </ButtonPresenter>
  );
};

export default ChangeCameraButtonContainer;
