import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
    getTheme,
    Card,
} from 'react-native-material-ui';
const theme = getTheme();

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
      const { navigation } = this.props;
      const title = navigation.getParam('title', 'NO-ID');
      const content = navigation.getParam('content', 'some default value');

      return (
        <Card style={theme.cardStyle}>
          <View style={theme.cardStyle}>
              <Text style={theme.cardTitleStyle}>
                  {title}</Text>
              <Text style={theme.cardContentStyle}>
                  {content}
              </Text>
          </View>
        </Card>
    );
  }
}

export default Screen;
