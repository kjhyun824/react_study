import { StyleSheet } from 'react-native';
import { css } from 'styled-components/native';

const flexCss = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const defaultCommonCss = css`
  width: 200px;
  height: 40px;

  border-radius: 6px;
  ${flexCss}
`;

export const defaultTitleCss = css`
  font-family: NotoSansCJKkr-Medium;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 22px;
  letter-spacing: 0px;
`;

const styles = StyleSheet.create({
  touchableStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
