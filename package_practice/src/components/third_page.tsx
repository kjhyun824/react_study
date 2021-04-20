import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';

interface ThirdPageProps {
  is_embed: boolean;
}

const ThirdPage = ({ is_embed }: ThirdPageProps): ReactElement => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    console.log('[DEBUG] Third Page');
    console.log('[DEBUG] is_embed : ', is_embed);
    setTimeout(() => {
      if (is_embed) navigation.navigate(ApplicationPage.PowderPage);
      else {
        navigation.navigate(ApplicationPage.FirstPage);
      }
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
