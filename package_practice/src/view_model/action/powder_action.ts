import { DEFAULT_VIDEO_FRAMERATE, CAMERA_CAPTURE_RESOLUTION, ResponseType } from '../../constant/common_constant';
import { MediaStatus } from '../../constant/types';
import Action from '../../view_model/action/action';
import GlobalStore from '../../view_model/store/global_store';
import {
  MeetingCommon,
  ServiceType,
  LocalDeviceStreamRequestDTO,
  LocalDeviceStreamRequestType,
  RoomRequestType,
  RoomRequestDTO,
  UserRequestDTO,
  UserRequestType,
  UserCreateReturnType,
  MeetingError,
} from '@meeting/meeting-core';
import { action } from 'mobx';
import { MediaStream } from 'react-native-webrtc';

class PowderAction extends Action {
  private store_: GlobalStore;

  constructor(store: GlobalStore) {
    super();
    this.store_ = store;
  }

  @action.bound
  public init() {
    this.store_.setResponseStatus(ResponseType.NONE);
  }

  public deinit() {
    this.store_.powder_room.changeMicStatus(false);
    this.store_.powder_room.changeCameraStatus(true);
    this.store_.powder_room.setJoinUserError(null);
    this.store_.linkStore.setLeaderToken('');
  }

  public disconnect(): void {
    const room_id = this.store_.room_id;
    const request_body: RoomRequestDTO = {
      request_type: RoomRequestType.DELETE,
      data: { room_id },
    };

    this.store_.room_id = '';

    MeetingCommon.GetInstance()
      .sendRequest(ServiceType.ROOM, request_body)
      .then(() => {
        MeetingCommon.Clear();
      })
      .catch((error) => {});
  }

  public changeMicStatus() {
    this.store_.powder_room.changeMicStatus();
  }

  public changeCameraStatus() {
    this.store_.powder_room.changeCameraStatus();
  }

  public changeMirrorMode() {
    this.store_.toggleMirror();

    if (this.store_.powder_room.local_media_stream) {
      this.store_.powder_room.local_media_stream.setMirror(this.store_.getMirror());
    }
  }

  public switchCamera() {
    if (this.store_.powder_room.local_media_stream) {
      this.store_.toggleCameraDirection();
      const mirror =
        (this.store_.using_front_camera && this.store_.front_mirror) ||
        (!this.store_.using_front_camera && this.store_.back_mirror);
      this.store_.powder_room.local_media_stream.getVideoTracks()[0]._switchCamera(mirror);
    }
  }

  public requestLocalMediaStream(audio: boolean, video: boolean) {
    const constraints = {
      env: 'mobile',
      create_option: {
        audio: {
          id: audio,
        },
        video: {
          id: video ? '' : false,
          options: {
            width: CAMERA_CAPTURE_RESOLUTION.width,
            height: CAMERA_CAPTURE_RESOLUTION.height,
            frameRate: DEFAULT_VIDEO_FRAMERATE,
            facingMode: 'user',
          },
        },
      },
    };
    // console.log(constraints.create_option.video.options);
    const request_body: LocalDeviceStreamRequestDTO = {
      request_type: LocalDeviceStreamRequestType.CREATE,
      data: constraints,
    };

    const deletePromise = () => {
      return new Promise(async (resolve, reject) => {
        if (!this.store_.powder_room.local_media_stream) {
          return resolve(true);
        }
        const request_body = {
          request_type: LocalDeviceStreamRequestType.DELETE,
          data: {
            stream_id: this.store_.powder_room.local_media_stream.id,
          },
        };
        try {
          const ret = await MeetingCommon.GetInstance().sendRequest(ServiceType.LOCAL_DEVICE_STREAM, request_body);
          this.store_.powder_room.changeLocalMediaStream(null);
          resolve(ret);
        } catch (err) {
          reject(err);
        }
      });
    };

    deletePromise().then((data) => {
      MeetingCommon.GetInstance()
        .sendRequest(ServiceType.LOCAL_DEVICE_STREAM, request_body)
        .then((media_stream: MediaStream) => {
          this.store_.powder_room.changeLocalMediaStream(media_stream);
          this.store_.restoreCameraDeviceState(true);
          media_stream.getVideoTracks().forEach((track) => {
            track.enabled = video;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  public requestJoinRoom() {
    if (this.store_.meeting_started) {
      console.warn('Try to rejoin. Please end the meeting first.');
      return;
    }
    this.store_.setMeetingStarted(true);

    const user_request_body: UserRequestDTO = {
      request_type: UserRequestType.CREATE,
      data: {
        leader_token: this.store_.linkStore.leader_token,
      },
    };

    MeetingCommon.GetInstance()
      .sendRequest(ServiceType.USER, user_request_body)
      .then((data: UserCreateReturnType) => {
        if (typeof data.meeting_start_time === 'number') {
          this.store_.setResponseStatus(ResponseType.SUCCESS);
          this.store_.setStartTime(new Date(data.meeting_start_time));
          this.store_.setJoinTime(new Date(data.user_join_time));
          this.store_.setDeviceJoinTime(new Date());
          // TODO: power room의 mic/camera status도 mediastatus로 바꾸면 좋을 듯.
          this.store_.setAudioMute(this.store_.powder_room.mic_status ? MediaStatus.UNMUTE : MediaStatus.MUTE);
          this.store_.setVideoMute(this.store_.powder_room.camera_status ? MediaStatus.UNMUTE : MediaStatus.MUTE);
        } else {
          this.store_.setResponseStatus(ResponseType.FAILED);
        }
      })
      .catch((error) => {
        console.log(`[ERROR][${this.requestJoinRoom.name}] : ${error}`);
        this.store_.setResponseStatus(ResponseType.FAILED);

        const meeting_error: MeetingError = error;
        this.store_.powder_room.setJoinUserError(meeting_error);
        this.store_.setMeetingStarted(false);
      });
  }

  public resetStatus() {
    this.store_.setResponseStatus(ResponseType.NONE);
  }

  public resetCameraDeviceState() {
    this.store_.resetCameraDeviceState();
  }
}

export default PowderAction;
