import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ApplicationPage } from '../constant/navigation';
import { SampleBlock, SampleText } from '../styles/style';
var ThirdPage = function (_a) {
    var is_embed = _a.is_embed;
    var navigation = useNavigation();
    useFocusEffect(function () {
        console.log('[DEBUG] Third Page');
        console.log('[DEBUG] is_embed : ', is_embed);
        setTimeout(function () {
            if (is_embed)
                navigation.navigate(ApplicationPage.SecondPage);
            else {
                navigation.navigate(ApplicationPage.FirstPage);
            }
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