import React from 'react';
import styled, { css } from 'styled-components/native';
import useStore from '../../../util/mobx/hook/useStore';
import { GlobalContext } from '../../../util/mobx/context/global_context';
import { useObserver } from 'mobx-react';

import { SolidButton } from '../../../components/button';

interface ButtonProps {
  width?: number;
  height?: number;
  callback?: (data: any) => void;
}

const useLocalMediaStream = () => {
  const store = useStore(GlobalContext);
  return useObserver(() => ({
    local_media_stream: store?.powder_room.local_media_stream,
  }));
};

const JoinButtonContainer = ({ width, height, callback }: ButtonProps) => {
  const { local_media_stream } = useLocalMediaStream();

  return (
    <JoinButton
      title="입장하기"
      disabled={local_media_stream ? false : true}
      onPress={() => {
        callback && callback('join');
      }}
      width={width}
      height={height}
    />
  );
};

const titleCss = css`
  text-align: center;
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
`;

const JoinButton = styled(SolidButton).attrs((props) => ({
  buttonStyle: {
    common: css`
      width: ${props.width}px;
      height: ${props.height}px;
    `,
  },
  titleOptions: {
    style: {
      common: titleCss,
      pressedIn: titleCss,
      pressedOut: titleCss,
      disabled: titleCss,
    },
  },
  isGradientButton: true,
}))``;

export default JoinButtonContainer;
