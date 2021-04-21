import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';

import StreamPresenter from './stream_presenter';
import useStore from '../../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../../util/mobx/context/global_context';

import PersonImage from '../../../../resource/asset/icon/meeting/person.svg';
import useAction from '../../../../util/mobx/hook/useAction';
import PowderAction from '../../../../view_model/action/powder_action';

const useCameraStatus = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    mic_status: store!.powder_room.mic_status,
    camera_status: store!.powder_room.camera_status,
    local_media_stream: store!.powder_room.local_media_stream,
  }));
};

const LocalStreamContainer = () => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  const { mic_status, camera_status, local_media_stream } = useCameraStatus();

  useEffect(() => {
    /*  RNSoundLevel.start();
    RNSoundLevel.onNewFrame = (data: any) => {
      data.value >= -20 ? console.log('Sound level info', data) : null;
    };
   */
  }, []);

  useEffect(() => {
    powder_action.requestLocalMediaStream(mic_status, camera_status);
  }, [mic_status, camera_status]);

  return (
    <>{camera_status ? <StreamPresenter stream={local_media_stream} /> : <PersonImage width={200} height={200} />}</>
  );
};

export default LocalStreamContainer;
