import React, { Component } from 'react';

import {
    getTheme,
    Card,
    Button,
} from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { getString } from '../../../STRINGS';
import { ratio, colors } from '../../utils/Styles';

const styles = StyleSheet.create({
    inputStyle:{
        color: '#333',
        fontSize: 16,
        lineHeight: 23,
        borderBottomColor: '#333',
        borderBottomWidth: 0.5,
        fontFamily: 'System',
    },
    labelStyle:{
        fontSize: 18,
        color: '#737373',
        paddingBottom: 10,
        fontFamily: 'System',
        position: 'relative',
    },
    containerStyle:{
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
    }
});

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      title: '',
      content: '',
    };
  }

  public render() {
      const { navigation } = this.props;
      let { title, content } = this.state;
      const theme = getTheme();
      return (
          <ScrollView
              style={styles.containerStyle}
              contentContainerStyle={styles.scrollViewContainer}
          >
              <Card style={theme.cardStyle}>
                  <TextField
                      label='제목'
                      value={title}
                      onChangeText={ (title) => this.setState({ title }) }
                  />
                  <TextField
                      style={{height: 40}}
                      label='내용'
                      multiline={true}
                      value={content}
                      umberOfLines={24}
                      onChangeText={ (content) => this.setState({ content }) }
                  />
                  <View>
                      <Button
                          primary
                          text="저장하기"
                          onPress={() => navigation.navigate("PostDetail",{
                              title: this.state.title,
                              content: this.state.content,
                          })}
                      >
                      </Button>
                  </View>
              </Card>
          </ScrollView>
    );
  }

    private onTextChanged = (type: string, text: string) => {
        switch (type) {
            case 'NAME':
                this.setState({displayName: text});
                break;
            case 'STATUS_MSG':
                this.setState({statusMsg: text});
                break;
        }
    }
}

export default Screen;
