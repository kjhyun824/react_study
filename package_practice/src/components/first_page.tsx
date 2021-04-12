import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';

const FirstPage = (): ReactElement => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    console.log('[DEBUG] First Page');
    setTimeout(() => {
      navigation.navigate(ApplicationPage.SecondPage);
    }, 3000);
    return () => {
      console.log('[DEBUG] First leave');
    };
  });

  return (
    <SampleBlock>
      <SampleText> Hello, First Page! </SampleText>
    </SampleBlock>
  );
};

export default FirstPage;
