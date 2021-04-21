import { useObserver } from 'mobx-react';
import React from 'react';
import ButtonPresenter from './button_presenter';

import useAction from '../../../util/mobx/hook/useAction';
import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import MirrorIcon from '../../../resource/asset/icon/meeting/mirror.svg';
import PowderAction from '../../../view_model/action/powder_action';

interface Props {
  width: number;
  height: number;
  callback?: (data: any) => void;
}

const useCameraStatus = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    using_front_camera: store!.using_front_camera,
    front_mirror: store!.front_mirror,
    back_mirror: store!.back_mirror,
  }));
};

const MirrorButtonContainer = ({ width, height, callback }: Props) => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const { using_front_camera, front_mirror, back_mirror } = useCameraStatus();

  const is_mirror_on = (using_front_camera && front_mirror) || (!using_front_camera && back_mirror);

  return (
    <ButtonPresenter
      width={width}
      height={height}
      onPress={() => {
        powder_action.changeMirrorMode();
        callback && callback('mirror');
      }}
    >
      <MirrorIcon width={width} height={height} fill={is_mirror_on ? '#ffa717' : 'white'} />
    </ButtonPresenter>
  );
};

export default MirrorButtonContainer;
