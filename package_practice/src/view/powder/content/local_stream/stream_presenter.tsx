import React from 'react';
import { MediaStream, RTCView } from 'react-native-webrtc';
import styled from 'styled-components/native';

const SPINNER_GIF = require('../../../../resource/asset/gif/loading_yellow.gif');

const Block = styled.View`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingBlock = styled(Block)`
  padding-bottom: 25px;
`;

const Spinner = styled.Image`
  background-color: transparent;
  width: 80px;
  height: 80px;
`;

const Loading = () => {
  return (
    <LoadingBlock>
      <Spinner resizeMode="contain" source={SPINNER_GIF} />
    </LoadingBlock>
  );
};

interface Props {
  stream: MediaStream | null;
}

const StreamView = ({ stream }: Props) => {
  // const result = deviceInfoModule.isEmulator().then((data)=> data);
  /* setInterval(() => {
    console.log(stream);
    const video_track: MediaStreamTrack | undefined = stream?.getAudioTracks()[0];
    if (video_track) video_track.enabled = !video_track.enabled;
  }, 5000);
*/
  return (
    <>
      <RTCView style={{ width: '100%', height: '100%' }} streamURL={stream!.toURL()} objectFit="cover" />
    </>
  );
};

const StreamPresenter = ({ stream }: Props) => {
  return <Block>{stream === null ? <Loading /> : <StreamView stream={stream} />}</Block>;
};

export default StreamPresenter;
