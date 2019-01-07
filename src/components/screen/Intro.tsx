import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import { getUserList, addUser } from '../../apis/sample';
import Button from '../shared/Button';

import { ratio, colors } from '../../utils/Styles';
import { IC_MASK } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import { BottomNavigation, COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

const uiTheme = {
    palette: {
      primaryColor: COLOR.green500,
    },
    toolbar: {
      container: {
        height: 50,
      },
    },
  };
  
export const SCENE = {
    CREATE : 1,
    UPDATE : 2,
    DELETE : 3,
    ALL : 4,
};

interface IProps {
    navigation?: any;
    store: any;
}

interface IState {
    isLoggingIn: boolean;
    loading: boolean;
    data: any;
    scene: number;
}

@inject('store') @observer
class Page extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            scene: SCENE.ALL,
            isLoggingIn: false,
            loading: true,
            data: [],
        };
    }

    public async componentDidMount() {
        const list: any = await getUserList();
        this.setState({
            isLoggingIn: false,
            loading: false,
            data: list,
        });
    }

    public handleTitle = (text) => {
        this.setState({title: text});
    }
    public handleContent = (text) => {
        this.setState({ content: text });
    }
    public add = (title, content) => {
        addUser(title, content);
    }

    public addPost() {
        this.setState({
            isLoggingIn: false,
            loading: false,
            data: [],
            scene: SCENE.CREATE,
        });
    }

    public showAll() {
        return (
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <View style={styles.flatview}>
                                <Text style={styles.name}>{item.id}</Text>
                                <Text style={styles.name}>{item.title}</Text>
                                <Text style={styles.content}>{item.content}</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
                <BottomNavigation style={styles.navbar}  hidden={false} >
                    <BottomNavigation.Action
                    key="home"
                    icon='home'
                    isLoading={this.state.isLoggingIn}
                    style={styles.btnLogin}
                    textStyle={styles.txtLogin}
                    imgLeftSrc={IC_MASK}
                    imgLeftStyle={styles.imgBtn}
                    text={getString('LOGIN')}
                    />
                    <BottomNavigation.Action
                    key="search"
                    icon='search'
                    />
                    <BottomNavigation.Action
                    key="add"
                    icon="add"
                    onPress={() => this.addPost() }
                    />
                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                    />
                    <BottomNavigation.Action
                        key="account"
                        icon="favorite"
                    />
                </BottomNavigation>
            </ThemeContext.Provider>
        )
    }

    public onCreate() {
        return (
            <View style={styles.formContainer}>
                <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="title"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={this.handleTitle}/>
                <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Content"
                            placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            onChangeText={this.handleContent}/>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.add(this.state.title, this.state.content)
                    }>
                    <Text style={styles.submitButtonText}> 만들기 </Text>
                </TouchableOpacity>
            </View>
        );

    }

    public render() {
        switch (this.state.scene) {
            case SCENE.ALL:
                return this.showAll();
            case SCENE.CREATE:
                return this.onCreate();
            default:
                return this.onCreate();
        }
    }
}

const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center',
    },
    formContainer: {
        paddingTop: 23,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white',
    },
    btnNavigate: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 4,
        width: 320,
        height: 52,

        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Verdana',
        fontSize: 18,
    },
    content: {
        color: 'red',
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
});

export default Page;
