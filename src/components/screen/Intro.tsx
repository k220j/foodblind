import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    CameraRoll,
    Image,
} from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import { getUserList, addUser } from '../../apis/sample';
import { ratio, colors } from '../../utils/Styles';
import { IC_MASK } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import { BottomNavigation,
         COLOR,
         ThemeContext,
         getTheme,
         Icon,
         Card,
         ListItem,
         Avatar,
    } from 'react-native-material-ui';
import ImagePicker from 'react-native-image-picker';
import Post from './Post';
import { withNavigation } from 'react-navigation';

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

const test_data = [
    {id: 1, title: 'hello', content: '안녕하신가?'},
    {id: 2, title: '첫번째 학생인가요?', content: '내이름이 궁금하냐'},
    {id: 3, title: '크크크', content: '테스트이다.'},
    {id: 4, title: '내가 처음이냐?', content: '쿄쿄쿄'}
];

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
    pickedImage: any;
}

@inject('store') @observer
class Page extends Component<IProps, IState> {
    public camera = null ;
    public navigation = this.props.navigation;

    constructor(props) {
        super(props);
        this.state = {
            scene: SCENE.ALL,
            isLoggingIn: false,
            loading: true,
            data: [],
            pickedImage: null,
        };
    }

    public async componentDidMount() {
        this.setState({data: test_data});
    }

    public _onPress = () => {
        this.navigation.navigate('Login');
    }

    public renderRow = ({item}) => {
        const theme = getTheme();
        let post_item =
            <Card
                style={theme.cardStyle}
                onPress={() => this.navigation.navigate("Login")}
            >
                <ListItem
                    divider
                    leftElement={<Avatar text="MW" />}
                    centerElement={{
                        primaryText: `${item.title}`,
                        secondaryText: `${item.content}`,
                    }}
                />
            </Card>;
        return post_item;
    }

    public render() {
        return (
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.title}
                    navigation={this.props.navigation}
                />
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
                        onPress={() => this.props.navigation.navigate('Login') }
                    />
                    <BottomNavigation.Action
                        key="search"
                        icon='search'
                    />
                    <BottomNavigation.Action
                        key="add"
                        icon="add"
                        onPress={() => this.pickImageHandler() }
                    />
                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        onPress={() => this.props.navigation.navigate('NotFound') }
                    />
                    <BottomNavigation.Action
                        key="account"
                        icon="favorite"
                    />
                </BottomNavigation>
            </ThemeContext.Provider>
        );
    }
}

const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center',
    },
    previewImage: {
        width: '50%',
        height: '50%',
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },

});

export default withNavigation(Page);
