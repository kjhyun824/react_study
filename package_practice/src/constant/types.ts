import { SubscribeState, SubscribeStreamState } from './common_constant';
import { MediaStream } from 'react-native-webrtc';

type Resolution = {
  width: number;
  height: number;
};

export enum MediaStatus {
  NO_DEVICE,
  MUTE,
  UNMUTE,
}

export interface SubscribeInfo {
  state: SubscribeState;
  stream_state: SubscribeStreamState;
  stream: MediaStream | null;
  resolution: Resolution | null;
  media: any;
}

export interface userItem {
  id: string;
  name: string;
  audioStatus: MediaStatus;
  videoStatus: MediaStatus;
  isLeader: boolean;
  dropDown: boolean;
  subscribeInfo: SubscribeInfo;
}

export interface VideoReceiveOption {
  resolution: Resolution;
  frameRate: number;
  bitrateMultiplier: number;
  keyFrameInterval: number;
}

export interface MediaReceiveOption {
  audio: boolean | Object;
  video: boolean | VideoReceiveOption;
}

export interface ToastProps {
  userName?: string;
  time?: number;
}
