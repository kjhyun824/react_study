import React, { forwardRef, Ref } from 'react';
import ButtonInternal, { ButtonHandle, ArrayedButtonStateStyle, IconProps } from './button_internal';
import { css } from 'styled-components/native';
import { defaultCommonCss } from './styles';
import { GestureResponderEvent } from 'react-native';

interface ActionButtonProps {
  iconProps?: IconProps;
  buttonStyle?: ArrayedButtonStateStyle;
  titleOptions?: any;
  title: string;
  onPress: (e: GestureResponderEvent) => void;
}
const defaultActionTitleCss = css`
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
  letter-spacing: 0px;
  font-weight: bold;
`;

const ActionButton = forwardRef((props: ActionButtonProps, ref?: Ref<ButtonHandle>) => {
  return (
    <ButtonInternal
      ref={ref}
      {...props}
      buttonStyle={{
        common: [defaultCommonCss, props.buttonStyle?.common!],
        pressedIn: [
          css`
            background-color: #ff7c3d;
          `,
          props.buttonStyle?.pressedIn!,
        ],
        pressedOut: [
          css`
            background-color: #ff8701;
          `,
          props.buttonStyle?.pressedOut!,
        ],
      }}
      titleOptions={{
        style: {
          common: props.titleOptions?.style?.common ?? defaultActionTitleCss,
          disabled: props.titleOptions?.style?.disabled ?? defaultActionTitleCss,
          pressedIn: props.titleOptions?.style?.pressedIn ?? defaultActionTitleCss,
          pressedOut: props.titleOptions?.style?.pressedOut ?? defaultActionTitleCss,
        },
      }}
      leftIconProps={props.iconProps}
    />
  );
});

export default ActionButton;
