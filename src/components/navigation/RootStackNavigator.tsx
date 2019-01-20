import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import { Button } from 'react-native-material-ui';
import { observer } from 'mobx-react/native';

import { colors } from '../../utils/Styles';
import appStore from '../../stores/appStore';
import IntroScreen from '../screen/Intro';
import NotFoundScreen from '../screen/NotFound';
import LoginScreen from '../screen/Login';
import RegisterScreen from '../screen/Register';
// import Button from '../shared/Button';

const initialRouteName = isLogin();
const routeConfig = {
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      title: 'foodBlind',
      headerRight: (
        <Button
          text="" 
          // onPress={() => navigation('Login') }
          icon='menu'
        />
      )
    },
    path: 'intro',
  },
  Login: {
    screen: LoginScreen,
    path: 'Login',
  },
  Register: {
    screen: RegisterScreen,
    path: 'Register',
  }
};

async function isLogin() {
    const isLogin = await AsyncStorage.getItem("isLogin");
    if ( isLogin === 'true' ) {
        return 'Intro';
    } else {
        return 'SignUp';
    }
}

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
