import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';
var SecondPage = function () {
    var navigation = useNavigation();
    useFocusEffect(function () {
        console.log('[DEBUG] Second Page');
        setTimeout(function () {
            navigation.navigate(ApplicationPage.ThirdPage);
        }, 3000);
        return function () {
            console.log('[DEBUG] Second leave');
        };
    });
    return (<SampleBlock>
      <SampleText> Hello, Second Page! </SampleText>
    </SampleBlock>);
};
export default SecondPage;
//# sourceMappingURL=second_page.js.map