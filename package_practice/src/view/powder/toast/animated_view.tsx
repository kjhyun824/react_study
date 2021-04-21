import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface Props {
  visible?: boolean;
  duration?: number;
  animate?: boolean;
  unmountOnHide?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const AnimatedHideView = ({
  visible = false,
  duration = 300,
  animate = true,
  unmountOnHide = false,
  style = {},
  children,
}: Props) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(visible ? 1 : 0));

  const animateView = () => {
    Animated.timing(opacity.current, {
      toValue: visible ? 1 : 0,
      duration: animate ? duration : 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateView();
  }, [visible]);

  const pointer_events = visible ? 'auto' : 'none';

  if (unmountOnHide && !visible) {
    return <></>;
  }

  const renderStyle = {
    opacity: opacity.current,
    zIndex: visible ? 1 : 0,
  };

  return (
    <Animated.View pointerEvents={pointer_events} style={[renderStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedHideView;
