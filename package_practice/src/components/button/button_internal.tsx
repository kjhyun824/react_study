import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import {
  Pressable,
  PressableProps,
  TextProps,
  TouchableHighlightProps,
  TouchableOpacityProps,
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { FlattenSimpleInterpolation } from 'styled-components';
import styled from 'styled-components/native';
import styles from './styles';

enum ButtonState {
  DISABLED = 'disabled',
  PRESSED_IN = 'pressedIn',
  PRESSED_OUT = 'pressedOut',
}

type TouchableComponentProps = TouchableHighlightProps &
  TouchableOpacityProps &
  TouchableWithoutFeedbackProps &
  PressableProps;

type TouchableComponentTypes =
  | React.FC<TouchableHighlightProps>
  | React.FC<TouchableOpacityProps>
  | React.FC<TouchableWithoutFeedbackProps>
  | React.FC<PressableProps>;

type ButtonStateStyleCssType = FlattenSimpleInterpolation;

type Nullable<T> = T | null;

type GradientButtonProps = {
  pressedIn?: Nullable<LinearGradientProps>;
  pressedOut: Nullable<LinearGradientProps>;
  disabled?: Nullable<LinearGradientProps>;
};

type ButtonStateStyleArray = Array<ButtonStateStyleCssType>;

export type ArrayedButtonStateStyle = {
  common: ButtonStateStyleArray;
  pressedIn?: ButtonStateStyleArray;
  pressedOut?: ButtonStateStyleArray;
  disabled?: ButtonStateStyleArray;
  gradientProps?: Nullable<GradientButtonProps>;
};

export type IconProps = {
  Icon: any;
  iconStyle?: ArrayedButtonStateStyle;
  containerStyle?: ArrayedButtonStateStyle;
};

type BaseButtonStyle = {
  common: ButtonStateStyleCssType;
  pressedIn?: ButtonStateStyleCssType;
  pressedOut?: ButtonStateStyleCssType;
  disabled?: ButtonStateStyleCssType;
  gradientProps?: Nullable<GradientButtonProps>;
};

type titleProps = {
  style: BaseButtonStyle;
  props?: TextProps;
};

type OuterAreaStyle = ArrayedButtonStateStyle;
type ButtonStyle = ArrayedButtonStateStyle;

interface ButtonProps {
  TouchableComponent?: TouchableComponentTypes;
  disabled?: boolean;

  title?: string;
  titleOptions?: titleProps;

  buttonStyle?: ButtonStyle;
  touchableProps?: TouchableComponentProps;

  containerStyle?: OuterAreaStyle;
  leftIconProps?: IconProps;
  titleContainerStyle?: ArrayedButtonStateStyle;
  // rightIconProps?: IconProps;
  onPress?: (evt: GestureResponderEvent) => void;
  onLongPress?: (evt: GestureResponderEvent) => void;
}

export type ButtonHandle = {
  setDisabled: (disabled: boolean) => void;
};

//    -------------------------------------------------
//   |  ⌜------------⌝ ⌜-------------⌝ ⌜------------⌝  |
//   |  | ICON LEFT  | |    TITLE    | | ICON RIGHT |  |
//   |  ⌞------------⌟ ⌞-------------⌟ ⌞------------⌟  |
//    -------------------------------------------------

// type guarding fucntion.
const isGradientButtonView = (props: any): props is LinearGradientProps => {
  const is_gradient_button: true | undefined = props && 'colors' in props;
  return is_gradient_button ? true : false;
};

const ButtonInternal = forwardRef(
  ({ disabled = false, TouchableComponent = Pressable, ...props }: ButtonProps, ref: Ref<ButtonHandle>) => {
    const [buttonState, setButtonState] = useState<ButtonState>(
      disabled ? ButtonState.DISABLED : ButtonState.PRESSED_OUT,
    );

    useEffect(() => {
      setButtonState(() => (disabled ? ButtonState.DISABLED : ButtonState.PRESSED_OUT));
    }, [disabled]);

    useImperativeHandle(ref, () => ({
      setDisabled: (disabled: boolean) => {
        setButtonState(disabled ? ButtonState.DISABLED : ButtonState.PRESSED_OUT);
      },
    }));

    const InnerArea = (isGradientButtonView(props.buttonStyle?.gradientProps?.[buttonState])
      ? LinearGradientInnerArea
      : PlainInnerArea) as React.ComponentType<any>;
    return (
      <OuterArea buttonState={buttonState} viewStyle={props.containerStyle!}>
        <TouchableComponent
          style={styles.touchableStyle}
          {...props.touchableProps}
          onPressIn={(evt: GestureResponderEvent) => {
            if (buttonState !== ButtonState.DISABLED) {
              setButtonState(() => ButtonState.PRESSED_IN);
            }
          }}
          onPressOut={(evt: GestureResponderEvent) => {
            if (buttonState !== ButtonState.DISABLED) {
              setButtonState(() => ButtonState.PRESSED_OUT);
            }
          }}
          onPress={(evt: GestureResponderEvent) => {
            if (buttonState !== ButtonState.DISABLED) {
              props.onPress?.(evt);
            }
          }}
          onLongPress={(evt: GestureResponderEvent) => {
            if (buttonState !== ButtonState.DISABLED) {
              props.onLongPress?.(evt);
            }
          }}
          underlayColor={'transparent'}
        >
          <InnerArea
            buttonState={buttonState}
            viewStyle={props.buttonStyle}
            {...props.buttonStyle?.gradientProps?.[buttonState]}
          >
            {props.leftIconProps ? (
              <>
                <LeftIconView>
                  <props.leftIconProps.Icon />
                </LeftIconView>
                <MarginView />
              </>
            ) : null}
            {props.title ? (
              <TitleText
                buttonState={buttonState}
                titleStyle={props.titleOptions?.style}
                {...props.titleOptions?.props}
              >
                {props.title}
              </TitleText>
            ) : null}
          </InnerArea>
        </TouchableComponent>
      </OuterArea>
    );
  },
);

const parseFontSize = (props: ButtonStateStyleCssType): number => {
  const DEFAULT_FONT_SIZE = 14;

  if (!props) return DEFAULT_FONT_SIZE;

  const title_props: string = props.join();

  try {
    let start_idx: number = title_props.indexOf('font-size');
    const end_idx = title_props.indexOf('px', start_idx);
    if (start_idx === -1 || end_idx === -1) {
      throw 'INVALID_TITLE_PROPS';
    }
    const size_prop = title_props.substr(start_idx, end_idx - start_idx);
    const parsed_size = size_prop.match(/\d+/g);

    if (!parsed_size || parsed_size.length === 0) {
      throw 'INVALID_TITLE_PROPS';
    }

    const font_size = parseInt(parsed_size[0]);
    return font_size;
  } catch (err) {
    console.warn(`${parseFontSize.name}: ${err}, setting font size with 14px(default) ....`);
    return DEFAULT_FONT_SIZE;
  }
};

const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LinearGradientView = styled(LinearGradient)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface InnerProps {
  viewStyle?: ArrayedButtonStateStyle;
  titleStyle?: BaseButtonStyle;
  buttonState: ButtonState;
}

const OuterArea = styled(FlexView)<InnerProps>`
  ${(props) => props.viewStyle?.common};
  ${(props) => props.viewStyle?.[props.buttonState]};
`;

const LinearGradientInnerArea = styled(LinearGradientView)<InnerProps>`
  padding: 1px;
  ${(props) => props.viewStyle?.common};
  ${(props) => props.viewStyle?.[props.buttonState]};
`;

const PlainInnerArea = styled(FlexView)<InnerProps>`
  padding: 1px;
  ${(props) => props.viewStyle?.common};
  ${(props) => props.viewStyle?.[props.buttonState]};
`;

const ContentView = styled(FlexView)`
  height: 100%;
`;

const LeftIconView = styled(ContentView)``;

const MarginView = styled(ContentView)`
  width: 7px;
  height: 100%;
`;

const TitleText = styled.Text`
  ${(props: InnerProps) => props.titleStyle?.[props.buttonState]};
`;

export default ButtonInternal;
