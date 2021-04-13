import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';

const ThirdPage = (): ReactElement => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    console.log('[DEBUG] Third Page');
    setTimeout(() => {
      navigation.navigate(ApplicationPage.FirstPage);
    }, 3000);
    return () => {
      console.log('[DEBUG] Third leave');
    };
  });

  return (
    <SampleBlock>
      <SampleText> Hello, Third Page! </SampleText>
    </SampleBlock>
  );
};

export default ThirdPage;
