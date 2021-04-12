import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';

const SecondPage = (): ReactElement => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    console.log('[DEBUG] Second Page');
    setTimeout(() => {
      navigation.navigate(ApplicationPage.ThirdPage);
    }, 3000);
    return () => {
      console.log('[DEBUG] Second leave');
    };
  });

  return (
    <SampleBlock>
      <SampleText> Hello, Second Page! </SampleText>
    </SampleBlock>
  );
};

export default SecondPage;
