import React, { ReactElement } from 'react';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationPage } from './constant/navigation';
import FirstPage from './components/first_page';
import SecondPage from './components/second_page';
import ThirdPage from './components/third_page';
import PowderContainer from './view/powder/powder_container';
import { GlobalProvider } from './util/mobx/context/global_context';

const AppStack = createStackNavigator();

interface PackageProps {
  is_embed: boolean;
}

const default_screen_options: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const JHNavigator = ({ is_embed }: PackageProps): ReactElement => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={is_embed ? ApplicationPage.SecondPage : ApplicationPage.FirstPage}>
        {!is_embed ? (
          <AppStack.Screen name={ApplicationPage.FirstPage} component={FirstPage} options={default_screen_options} />
        ) : (
          <></>
        )}
        <AppStack.Screen name={ApplicationPage.SecondPage} component={SecondPage} options={default_screen_options} />
        <AppStack.Screen name={ApplicationPage.ThirdPage} options={default_screen_options}>
          {(props) => <ThirdPage {...props} is_embed={is_embed} />}
        </AppStack.Screen>
        <AppStack.Screen
          name={ApplicationPage.PowderPage}
          component={PowderContainer}
          options={default_screen_options}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const JHPractice = ({ is_embed }: PackageProps): ReactElement => {
  return (
    <GlobalProvider>
      <JHNavigator is_embed={is_embed} />
    </GlobalProvider>
  );
};

export default JHPractice;
