import { MeetingError } from '@meeting/meeting-core';
import { action, observable } from 'mobx';
import { MediaStream } from 'react-native-webrtc';

class PowderStore {
  @observable private mic_status_: boolean = false;
  @observable private camera_status_: boolean = true;
  @observable private local_media_stream_: MediaStream | null = null;
  @observable private join_user_error_: MeetingError | null = null;

  constructor() {}

  get mic_status() {
    return this.mic_status_;
  }

  get camera_status() {
    return this.camera_status_;
  }

  get local_media_stream() {
    return this.local_media_stream_;
  }

  get join_user_error() {
    return this.join_user_error_;
  }

  @action.bound
  changeMicStatus(status?: boolean) {
    this.mic_status_ = status !== undefined ? status : !this.mic_status_;
  }

  @action.bound
  changeCameraStatus(status?: boolean) {
    this.camera_status_ = status !== undefined ? status : !this.camera_status_;
  }

  @action.bound
  changeLocalMediaStream(media_stream: MediaStream | null) {
    this.local_media_stream_ = media_stream;
  }

  @action.bound
  setJoinUserError(meeting_error: MeetingError | null) {
    this.join_user_error_ = meeting_error;
  }
}

export default PowderStore;
