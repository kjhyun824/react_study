import React, { ReactElement } from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationPage } from './constant/navigation';
import FirstPage from './components/first_page';
import SecondPage from './components/second_page';
import ThirdPage from './components/third_page';

const AppStack = createStackNavigator();

const default_screen_options: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const JHPractice = (): ReactElement => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={ApplicationPage.FirstPage}>
        <AppStack.Screen
          name={ApplicationPage.FirstPage}
          component={FirstPage}
          options={default_screen_options}
        />
        <AppStack.Screen
          name={ApplicationPage.SecondPage}
          component={SecondPage}
          options={default_screen_options}
        />
        <AppStack.Screen
          name={ApplicationPage.ThirdPage}
          component={ThirdPage}
          options={default_screen_options}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default JHPractice;
