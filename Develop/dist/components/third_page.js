import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';
var ThirdPage = function () {
    var navigation = useNavigation();
    useFocusEffect(function () {
        console.log('[DEBUG] Third Page');
        setTimeout(function () {
            navigation.navigate(ApplicationPage.FirstPage);
        }, 3000);
        return function () {
            console.log('[DEBUG] Third leave');
        };
    });
    return (<SampleBlock>
      <SampleText> Hello, Third Page! </SampleText>
    </SampleBlock>);
};
export default ThirdPage;
//# sourceMappingURL=third_page.js.map