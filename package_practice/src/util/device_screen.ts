import { Dimensions, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import ExtraDimension from 'react-native-extra-dimensions-android';

const DEFAULT_BOTTOM_BAR_HEIGHT = 48;

const getHeight = (type: 'screen' | 'window') => {
  if (type === 'screen') {
    return Dimensions.get('screen').height;
  }
  return Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : ExtraDimension.get('REAL_WINDOW_HEIGHT');
};

const getRealHeight = (type: 'screen' | 'window') => {
  const s_h = getHeight(type);
  const s_w = Dimensions.get(type).width;
  return s_h > s_w ? s_h : s_w;
};

const getRealWidth = (type: 'screen' | 'window') => {
  const s_h = getHeight(type);
  const s_w = Dimensions.get(type).width;
  return s_h < s_w ? s_h : s_w;
};

export const getStatusBarHeight = (): number => {
  let height = 10;
  return height ? height : 0;
};

export const getBottomNavigatorHeight = (bottom_included: boolean): number => {
  if (bottom_included === false) {
    return 0;
  }

  if (Platform.OS === 'android') {
    const screen_height = getRealHeight('screen');
    const window_height = getRealHeight('window');
    const height = Math.floor(screen_height - window_height);

    console.warn(
      `This implementation is incomplete. You should check this function;${getBottomNavigatorHeight.name} again.`,
    );
    return (
      height - (height > DEFAULT_BOTTOM_BAR_HEIGHT ? getStatusBarHeight() : 0)
    ); // temporary logic
  } else if (Platform.OS === 'ios') {
    const height = getBottomSpace();
    return height;
  }

  return -1;
};

export const getContentHeight = (bottom_included: boolean): number => {
  const screen_h = getRealHeight('screen');
  const top_h = getStatusBarHeight();
  const bottom_h = getBottomNavigatorHeight(bottom_included);
  const main_h = screen_h - top_h - bottom_h;
  return main_h;
};

export const getScreenHeight = (): number => {
  return getRealHeight('screen') - getStatusBarHeight();
};

export const getScreenWidth = (): number => {
  return getRealWidth('screen');
};
