export enum ButtonType {
  HEADER_CLOSE,
  HEADER_MIRROR,
  HEADER_SWITCH_CAMERA,
  HEADER_VIEW_CHANGE,
  HEADER_ROOM_INFO,
  ROOM_INFO_DIALOG_CANCEL_BUTTON,
  ROOM_INFO_DIALOG_SHARE_LINK,
  ROOM_INFO_DIALOG_CLOSE_BUTTON,
  ROOM_INFO_DIALOG_CONFIRM_BUTTON,
  FOOTER_CAMERA_ONOFF,
  FOOTER_MIC_ONOFF,
  FOOTER_VIEW_CHANGE,
  FOOTER_SCREEN_SHARE,
  FOOTER_ETC,
  FOOTER_MEETING_END,
}

export enum PopupDialogType {
  USERLIST_LEADER_CHANGE,
  USERLIST_FORCE_KICK_OUT,
  USERLIST_EXIT,
}

export enum ExitPopupDialogType {
  EXIT_ROOM_CONFIRM,
  ENTRANCE_FAILED,
  AUTO_ENDED,
}

export enum ExitButtonType {
  GO_LANDING,
  RE_ENTER,
}

export enum ViewMode {
  GRID,
  FOCUS,
}

export enum RotateMode {
  PORTRAIT,
  LANDSCAPE,
}

export enum SubViewCount {
  GRID = 4,
  FOCUS_PORTRAIT = 3,
  FOCUS_LANDSCAPE = 4,
}

export enum ResponseType {
  NONE = 1,
  PROCESSING = 2,
  NOT_FINISHED = 3,
  SUCCESS = 4,
  FAILED = 5,
  DONE = 6,
}

export enum ScreenShareStatus {
  NONE,
  SCREENCASTING,
}

export enum ToastStatus {
  NONE,
  USER_LEFT,
  LEADER_CHANGED,
  SCREEN_SHARE_START,
  SCREEN_SHARE_TERMINATE,
  SCREEN_SHARE_FOCUS_VIEW_ALERT,
  ROOM_EXPIRED_ALERT,
}

export enum ModalKey {
  ROOM_INFO_DIALOG = 'ROOM_INFO_DIALOG',
  CHANGE_VIEW_DIALOG = 'CHANGE_VIEW_DIALOG',
}

export enum SubscribeState {
  NOT_READY,
  READY,
}

export enum SubscribeStreamState {
  MUTE,
  UNMUTE,
}

// default camera capture resolution: 640x360(16:9)
export const CAMERA_CAPTURE_RESOLUTION = {
  width: 640,
  height: 360,
};

export enum StreamType {
  CONTAIN_FIT,
  COVER_FIT,
}

export enum ExitType {
  NONE,
  USER_LEFT,
  MEETING_TIMEOUT,
  MEETING_TERMINATED,
  USER_KICKED,
}

export enum StreamTargetType {
  FOCUS_MAIN,
  FOCUS_SUB,
  GRID,
}

export enum CreateRoomType {
  NONE,
  LOGIN,
  WITHOUT_LOGIN,
  LOGIN_NON_PURCHASE,
  LOGIN_OVER_LIMIT,
  LOGIN_EXPIRED,
}

export enum AppLinkSource {
  STANDALONE,
  HYPERSPACE,
  HYPERMEETING_WEB,
  LINK_DEFAULT,
}

export enum ContentStatus {
  NONE,
  STREAM_SCREEN_SHARED,
  STREAM_UNMUTE,
  ICON_MUTE,
  ICON_NO_DEVICE,
  TEXT_SCREEN_SHARING,
}

export const DEFAULT_USER_NAME = 'default_user';
export const DEFAULT_ROOM_ID = 'tmax_default_room1234';
export const DEFAULT_ROOM_NAME = 'tmax_default_room';
// export const DEFAULT_LINK_URL = 'https://hypermeeting.biz/meeting';
export const DEFAULT_LINK_URL = 'tmax://hypermeeting.biz';
export const ROOM_ID_TEMPLATE = '000-000-0000';
export const MAX_ROOM_NAME_LENGTH = 50;
export const MIN_ROOM_NAME_LENGTH = 1;

export const LOGIN_BACKGROUND_IMAGE = require('../resource/asset/image/login/login_background.png');
export const LANDING_IMAGE = require('../resource/asset/image/landing/group2.png');
export const BACKGROUND_IMAGE = require('../resource/asset/image/landing/background.jpg');

export const DEFAULT_VIDEO_WIDTH = 360;
export const DEFAULT_VIDEO_HEIGHT = 480;
export const DEFAULT_VIDEO_FRAMERATE = 24;
export const DEFAULT_VIDEO_MOTION_FACTOR = 2;
export const MAX_VIDEO_RATIO = 0.75; // 4:3 resolution aspect ratio

export const KUSH_GAUGE_CONSTANT = 0.07;
export const HEADER_HEIGHT = 46;

export const HEADER_ROOM_TITLE_MAX_WIDTH = 102;

export const DEFAULT_TARGET_MEDIA_OPTIONS = {
  focus: {
    main: {
      framerate: 24,
      multiplier: 1,
      resolution_mult_threshold: DEFAULT_VIDEO_HEIGHT * DEFAULT_VIDEO_WIDTH,
    },
    sub: {
      framerate: 15,
      multiplier: 0.4,
      resolution_mult_threshold: (DEFAULT_VIDEO_HEIGHT * DEFAULT_VIDEO_WIDTH) / 2,
    },
  },
  grid: {
    framerate: 24,
    multiplier: 1,
    resolution_mult_threshold: (DEFAULT_VIDEO_HEIGHT * DEFAULT_VIDEO_WIDTH) / 2,
  },
};
