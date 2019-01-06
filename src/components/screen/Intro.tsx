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
import { getUserList } from '../../apis/sample';
import Button from '../shared/Button';

import { colors } from '../../utils/Styles';

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
        this.setState({ title: text });
    }
    public handleContent = (text) => {
        this.setState({ content: text })
    }
    public login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass);
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
       return <View style={styles.container}>
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
                <Button
                onPress={() => this.addPost() }
                style={[
                    styles.btnNavigate,
                    {
                        marginTop: 15,
                    },
                ]}
                textStyle={{
                    color: colors.dodgerBlue,
                }}
            >내용 추가하기</Button>
        </View>;
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
                        () => this.login(this.state.email, this.state.password)
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
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
