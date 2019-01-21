import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import {
    getTheme,
} from 'react-native-material-kit';

const theme = getTheme();


import { ratio, colors } from '../../utils/Styles';
// 게시물 관련 포스팅

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Screen extends Component<any, any> {
  static navigationOptions = {
    title: 'Title',
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
        <View style={theme.cardStyle}>
            <Text style={theme.cardTitleStyle}>
                {this.props.title}</Text>
            <Text style={theme.cardContentStyle}>
                {this.props.content}
            </Text>
        </View>
    );
  }
}

export default Screen;
