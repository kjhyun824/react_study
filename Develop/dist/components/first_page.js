import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';
var FirstPage = function () {
    var navigation = useNavigation();
    useFocusEffect(function () {
        console.log('[DEBUG] First Page');
        setTimeout(function () {
            navigation.navigate(ApplicationPage.SecondPage);
        }, 3000);
        return function () {
            console.log('[DEBUG] First leave');
        };
    });
    return (<SampleBlock>
      <SampleText> Hello, First Page! </SampleText>
    </SampleBlock>);
};
export default FirstPage;
//# sourceMappingURL=first_page.js.map