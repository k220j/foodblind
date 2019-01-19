import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { observer } from 'mobx-react/native';
import { AsyncStorage } from 'react-native'

import { colors } from '../../utils/Styles';
import IntroScreen from '../screen/Intro';
import NotFoundScreen from '../screen/NotFound';

async function isLogin() {
    const isLogin = await AsyncStorage.getItem("isLogin");
    if ( isLogin === 'true' ) {
        return 'Intro';
    } else {
        return 'SignUp';
    }
}


const initialRouteName = isLogin();
const routeConfig = {
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      title: 'Intro',
    },
    path: 'intro',
  },
  NotFound: {
    screen: NotFoundScreen,
    path: 'NotFound',
  },
};

const navigatorConfig = {
  initialRouteName: 'Intro',
  gesturesEnabled: true,
  statusBarStyle: 'light-content',
  navigationOptions: {
    headerStyle: {
      headerBackTitle: null,
      backgroundColor: colors.dodgerBlue,
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  },
};

const AppStackNavigator = createStackNavigator(routeConfig, navigatorConfig);
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

interface IProps {
  navigation: any;
}

@observer
class RootNavigator extends React.Component<IProps> {
  private static router = AppStackNavigator.router;

  public render() {
    return <AppStackNavigator navigation={this.props.navigation}/>;
  }
}

export default RootNavigator;
