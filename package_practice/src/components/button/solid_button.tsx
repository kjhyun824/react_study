import React, { forwardRef, Ref } from 'react';
import ButtonInternal, { ButtonHandle, ArrayedButtonStateStyle } from './button_internal';
import { css } from 'styled-components/native';
import { defaultCommonCss } from './styles';
import { GestureResponderEvent } from 'react-native';

interface SolidButtonProps {
  disabled?: boolean;
  buttonStyle?: ArrayedButtonStateStyle;
  titleOptions?: any;
  title: string;
  isGradientButton: boolean;
  onPress: (e: GestureResponderEvent) => void;
}

const defaultSolidTitleCss = css`
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
`;

const SolidButton = forwardRef(({ isGradientButton = false, ...props }: SolidButtonProps, ref?: Ref<ButtonHandle>) => {
  return (
    <ButtonInternal
      ref={ref}
      {...props}
      buttonStyle={{
        common: [defaultCommonCss, props.buttonStyle?.common!],
        pressedIn: [
          css`
            background-color: #ff941c;
          `,
          props.buttonStyle?.pressedIn!,
        ],
        pressedOut: [
          css`
            background-color: #ffb701;
          `,
          props.buttonStyle?.pressedOut!,
        ],
        disabled: [
          css`
            background-color: #cccccc;
          `,
          props.buttonStyle?.disabled!,
        ],
        gradientProps: isGradientButton
          ? {
              pressedOut: {
                colors: ['#FFB701', '#FF8A3D'],
                locations: [0, 1.0],
                useAngle: true,
                angle: 113,
                angleCenter: { x: 0.5, y: 0.5 },
              },
            }
          : null,
      }}
      titleOptions={{
        style: {
          common: props.titleOptions?.style.common ?? defaultSolidTitleCss,
          disabled: props.titleOptions?.style.disabled ?? defaultSolidTitleCss,
          pressedIn: props.titleOptions?.style.pressedIn ?? defaultSolidTitleCss,
          pressedOut: props.titleOptions?.style.pressedOut ?? defaultSolidTitleCss,
        },
      }}
      titleContainerStyle={{
        common: [
          css`
            justify-content: center;
            align-items: center;
          `,
        ],
      }}
    />
  );
});

export default SolidButton;
