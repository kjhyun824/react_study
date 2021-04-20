import React, { forwardRef, Ref } from 'react';
import ButtonInternal, { ButtonHandle, ArrayedButtonStateStyle } from './button_internal';
import { css } from 'styled-components/native';
import { defaultCommonCss } from './styles';
import { GestureResponderEvent } from 'react-native';

interface LineButtonProps {
  buttonStyle?: ArrayedButtonStateStyle;
  titleOptions?: any;
  title: string;
  onPress: (e: GestureResponderEvent) => void;
}

const titleCss = css`
  padding: 3px;
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
`;

const titleDisabledCss = css`
  padding: 3px;
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #2e2e2e;
  text-align: center;
  line-height: 22px;
  opacity: 0.4;
`;

const LineButton = forwardRef((props: LineButtonProps, ref?: Ref<ButtonHandle>) => {
  return (
    <ButtonInternal
      ref={ref}
      {...props}
      buttonStyle={{
        common: [defaultCommonCss, props.buttonStyle?.common!],
        pressedIn: [
          css`
            border-width: 1px;
            border-style: solid;
            border-color: #ff941c;
            opacity: 0.6;
          `,
          props.buttonStyle?.pressedIn!,
        ],
        pressedOut: [
          css`
            border-width: 1px;
            border-style: solid;
            border-color: #ffc000;
          `,
          props.buttonStyle?.pressedOut!,
        ],
        disabled: [
          css`
            border-width: 1px;
            border-style: solid;
            border-color: #979797;
            background-color: rgba(178, 178, 178, 0.6);
          `,
          props.buttonStyle?.disabled!,
        ],
      }}
      titleOptions={{
        style: { common: titleCss, disabled: titleDisabledCss, pressedIn: titleCss, pressedOut: titleCss },
      }}
      titleContainerStyle={{
        common: [
          css`
            justify-content: center;
          `,
        ],
      }}
    />
  );
});

export default LineButton;
