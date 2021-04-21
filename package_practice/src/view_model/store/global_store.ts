import { action, observable } from 'mobx';
import { MediaStream } from 'react-native-webrtc';

import PowderStore from './powder_store';
import LinkStore from './link_store';

import { ResponseType } from '../../constant/common_constant';
import { MediaStatus, userItem } from '../../constant/types';

class GlobalStore {
  @observable public current_time: Date = new Date();
  @observable public start_time: Date = new Date();
  @observable public join_time: Date = new Date();
  @observable public device_join_time: Date = new Date();

  @observable public user_id: string = '';
  @observable public user_name: string = '';
  @observable public room_id: string = '';
  @observable public room_name: string = '';
  @observable public room_password: string | undefined = undefined;
  @observable public room_mode: string = '';
  @observable public meeting_started: boolean = false;

  @observable public overlay_visibility: boolean = false;
  @observable public overlay_text: string = '';

  @observable public local_mediastream: MediaStream | null = null;
  @observable public audio_mix_stream: MediaStream | null = null;

  @observable public exit_dialog_visibility: boolean = false;

  @observable public password_switch: boolean = false;
  @observable public password_valid: boolean | undefined = undefined;

  @observable public user_list: Array<userItem> = [];
  @observable public leader: userItem | undefined = undefined;
  @observable public leader_mode: boolean = false;

  @observable public response_status: ResponseType = ResponseType.NONE;

  private powder_store: PowderStore = new PowderStore();
  private link_store: LinkStore = new LinkStore();

  @observable private audio_mute: MediaStatus = MediaStatus.MUTE;
  @observable private video_mute: MediaStatus = MediaStatus.UNMUTE;
  @observable public front_mirror: boolean = false;
  @observable public back_mirror: boolean = false;
  @observable public using_front_camera: boolean = true;

  constructor() {}

  @action.bound
  deinit() {
    this.meeting_started = false;
    this.user_list = [];
    this.linkStore.deinit();
  }

  getMirror() {
    if (this.using_front_camera) {
      return this.front_mirror;
    } else {
      return this.back_mirror;
    }
  }

  @action.bound
  toggleMirror() {
    if (this.using_front_camera) {
      this.front_mirror = !this.front_mirror;
    } else {
      this.back_mirror = !this.back_mirror;
    }
  }

  @action.bound
  toggleCameraDirection() {
    this.using_front_camera = !this.using_front_camera;
  }

  @action.bound
  resetCameraDeviceState() {
    this.using_front_camera = true;
    this.front_mirror = false;
    this.back_mirror = false;
  }

  // FIXME: Local stream에 대한 통일화 이후, Powder Room의 local media stream이 아닌 단일화된 객체에 요청하는 것으로 변경할 것.
  restoreCameraDeviceState(is_powder: boolean) {
    const target_stream = is_powder ? this.powder_room.local_media_stream : this.local_mediastream;

    if (!this.using_front_camera) {
      is_powder
        ? target_stream?.getVideoTracks()[0]._switchCamera(this.back_mirror)
        : target_stream?.getVideoTracks()[0].setMirror(this.back_mirror);
    } else {
      target_stream?.getVideoTracks()[0].setMirror(this.front_mirror);
    }
  }

  getAudioMute() {
    return this.audio_mute;
  }

  @action.bound
  setAudioMute(status: MediaStatus) {
    return (this.audio_mute = status);
  }

  getVideoMute() {
    return this.video_mute;
  }

  @action.bound
  setVideoMute(status: MediaStatus) {
    return (this.video_mute = status);
  }

  @action.bound
  updateCurrentTime() {
    this.current_time = new Date();
  }

  @action.bound
  setStartTime(time: Date) {
    this.start_time = time;
  }

  @action.bound
  setJoinTime(time: Date) {
    this.join_time = time;
  }

  @action.bound
  setDeviceJoinTime(time: Date) {
    this.device_join_time = time;
  }

  @action.bound
  setUserId(id: string) {
    this.user_id = id;
  }

  @action.bound
  setUserName(name: string) {
    this.user_name = name;
  }

  @action.bound
  setRoomId(id: string) {
    this.room_id = id;
  }

  @action.bound
  setRoomName(name: string) {
    this.room_name = name;
  }

  @action.bound
  setRoomMode(mode: string) {
    this.room_mode = mode;
  }

  @action.bound
  setRoomPassword(password: string) {
    this.room_password = password;
  }

  @action.bound
  setMeetingStarted(status: boolean) {
    this.meeting_started = status;
  }

  @action.bound
  setOverlayContent(visible: boolean, text?: string) {
    this.overlay_visibility = visible;
    if (text !== undefined) {
      this.overlay_text = text;
    }
  }

  @action.bound
  setLocalMediaStream(stream: MediaStream) {
    this.local_mediastream = stream;
  }

  @action.bound
  setAudioMixStream(stream: MediaStream | null) {
    this.audio_mix_stream = stream;
  }

  @action.bound
  changeCameraDirection() {
    this.local_mediastream!.getVideoTracks()[0]._switchCamera();
    this.toggleCameraDirection();
  }

  @action.bound
  setExitDialogVisibility(visible: boolean) {
    this.exit_dialog_visibility = visible;
  }

  @action.bound
  setLeader(leader: userItem) {
    this.leader = leader;
    this.leader_mode = leader.id === this.user_id;
  }

  @action.bound
  setPasswordSwitch(state: boolean) {
    this.password_switch = state;
  }

  @action.bound
  setRoomPasswordValid(value: boolean | undefined) {
    this.password_valid = value;
  }

  @action.bound
  deinitRoomPasswordPopup() {
    this.room_password = '';
    this.password_valid = undefined;
  }

  get powder_room() {
    return this.powder_store;
  }

  get linkStore() {
    return this.link_store;
  }

  @action.bound
  setResponseStatus(status: ResponseType) {
    this.response_status = status;
  }
}

export default GlobalStore;
