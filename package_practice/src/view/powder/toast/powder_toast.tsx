import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import styled from 'styled-components/native';
import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import AnimatedHideView from './animated_view';

import CameraEnableIcon from '../../../resource/asset/icon/meeting/camera_enable.svg';
import CameraDisableIcon from '../../../resource/asset/icon/meeting/camera_disable.svg';
import MicEnableIcon from '../../../resource/asset/icon/meeting/mic_enable.svg';
import MicDisableIcon from '../../../resource/asset/icon/meeting/mic_disable.svg';
import FlipIcon from '../../../resource/asset/icon/meeting/flip.svg';

const ToastBg = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: #3a3a3a;
  opacity: 0.5;
  border-color: #ffa717;
  border-width: 1px;
  border-radius: 15px;
`;

const ToastText = styled.Text`
  font-family: 'NotoSansCJKkr-Medium';
  text-align: center;
  color: #ffa717;
  letter-spacing: 0;
  font-size: 13px;
  line-height: 20px;
`;

const ToastOffText = styled(ToastText)`
  color: #ffffff;
`;

type TimeoutRef = any;

const useDeviceStatus = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    mic_status: store!.powder_room.mic_status,
    camera_status: store!.powder_room.camera_status,
    using_front_camera: store!.using_front_camera,
    front_mirror: store!.front_mirror,
    back_mirror: store!.back_mirror,
  }));
};

const ContentBlock = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MarginView = styled.View`
  width: 6px;
  height: 100%;
`;

const ContentComponent = (ContentIcon: any, ContentText: any, text_content: string, IconFill?: string) => {
  return (props: any) => {
    return (
      <ContentBlock>
        {ContentIcon ? (
          <>
            <ContentIcon width={24} height={24} fill={IconFill} />
            <MarginView />
          </>
        ) : (
          <></>
        )}
        {ContentText ? <ContentText>{text_content}</ContentText> : <></>}
      </ContentBlock>
    );
  };
};

const PowderToast = React.forwardRef((props, ref) => {
  const [toast_visible, setToastVisible] = useState<boolean>(false);
  const [toast_text, setToastText] = useState<string>('');

  const { mic_status, camera_status, using_front_camera, front_mirror, back_mirror } = useDeviceStatus();
  const prev_mic = useRef<boolean>(false);
  const prev_camera = useRef<boolean>(true);
  const prev_front = useRef<boolean>(true);
  const prev_mirror = useRef<boolean>(false);
  const toast_content = useRef(ContentComponent(null, null, ''));
  const hide_timeout = useRef<TimeoutRef>(null);

  useEffect(() => {
    if (prev_mic.current !== mic_status) {
      prev_mic.current = !prev_mic.current;
      toastFadeOut();
      setTimeout(() => {
        const IconComponent = mic_status ? MicEnableIcon : MicDisableIcon;
        const IconFill = mic_status ? '#ffa717' : 'white';
        const TextComponent = mic_status ? ToastText : ToastOffText;
        const text_content = `마이크 ${mic_status ? '켜짐' : '꺼짐'}`;
        toast_content.current = ContentComponent(IconComponent, TextComponent, text_content, IconFill);
        toastFadeIn();
      }, 0);
    }
  }, [mic_status]);

  useEffect(() => {
    if (prev_camera.current !== camera_status) {
      prev_camera.current = !prev_camera.current;
      toastFadeOut();
      setTimeout(() => {
        const IconComponent = camera_status ? CameraEnableIcon : CameraDisableIcon;
        const IconFill = camera_status ? '#ffa717' : 'white';
        const TextComponent = camera_status ? ToastText : ToastOffText;
        const text_content = `카메라 ${camera_status ? '켜짐' : '꺼짐'}`;
        toast_content.current = ContentComponent(IconComponent, TextComponent, text_content, IconFill);

        toastFadeIn();
      }, 0);
    }
  }, [camera_status]);

  useEffect(() => {
    if (prev_front.current !== using_front_camera) {
      prev_front.current = !prev_front.current;
      prev_mirror.current = using_front_camera ? front_mirror : back_mirror;
    } else {
      if (
        (prev_front.current && prev_mirror.current !== front_mirror) ||
        (!prev_front.current && prev_mirror.current !== back_mirror)
      ) {
        prev_mirror.current = !prev_mirror.current;
        toastFadeOut();
        setTimeout(() => {
          const IconComponent = FlipIcon;
          const IconFill = prev_mirror.current ? '#ffa717' : 'white';
          const TextComponent = prev_mirror.current ? ToastText : ToastOffText;
          const text_content = `카메라 좌우 반전됨`;
          toast_content.current = ContentComponent(IconComponent, TextComponent, text_content, IconFill);

          toastFadeIn();
        }, 0);
      }
    }
  }, [using_front_camera, front_mirror, back_mirror]);

  useEffect(() => {
    return () => {
      clearTimeout(hide_timeout.current);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    showToast(btn_name: string) {
      setToastText((prev_text) => btn_name);
      //toastFadeOut();
      toastFadeIn();
    },
    hideToast() {
      toastFadeOut();
    },
  }));

  const toastFadeIn = useCallback(() => {
    setToastVisible(() => true);
  }, []);

  const toastFadeOut = useCallback(() => {
    setToastVisible(() => false);
  }, []);

  useEffect(() => {
    if (toast_visible) {
      hide_timeout.current && clearTimeout(hide_timeout.current);
      hide_timeout.current = setTimeout(() => {
        setToastVisible(() => false);
      }, 2000);
    }
  }, [toast_visible, toast_text]);

  const ToastContent = toast_content.current;
  return (
    <AnimatedHideView visible={toast_visible} duration={100} animate={true}>
      <ToastBg />
      <ToastContent />
    </AnimatedHideView>
  );
});

export default React.memo(PowderToast);
