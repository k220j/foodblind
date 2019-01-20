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
import { BottomNavigation, COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import ImagePicker from 'react-native-image-picker';

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
    pickedImage: any;
}

@inject('store') @observer
class Page extends Component<IProps, IState> {
    public camera = null ;

    constructor(props) {
        super(props);
        this.state = {
            scene: SCENE.ALL,
            isLoggingIn: false,
            loading: true,
            data: [],
            pickedImage: null
        };
    }

    public async componentDidMount() {
        const list: any = await getUserList();

        this.setState({
            isLoggingIn: false,
            loading: false,
            data: list,
        });
        CameraRoll.getPhotos({first: 1}).then(data => {
            this.setState({ photoSource: { uri: data.edges[3].node.image.uri }});
        }, error => {
            console.log(error);
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

    public openGallery = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log(response);
        });
    }

    public pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                });

            }
        });
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
                    <Image source={this.state.pickedImage}/>
                </View>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
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
        )
    }

    public onCreate() {
        return (
        <View style={styles.container}>

            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => this.takePicture() }
                    style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    };

    public takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            alert(data.uri)
        }
    };

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

export default Page;
