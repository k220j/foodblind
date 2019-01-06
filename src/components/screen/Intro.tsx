import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


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
          <View>
              <FormLabel>title</FormLabel>
              <FormInput/>
              <FormLabel>content</FormLabel>
              <FormInput/>
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
    titleTxt: {
        marginTop: 100,
        color: colors.dusk,
        fontSize: 24,
    },
    txtLogin: {
        fontSize: 14,
        color: 'white',
    },
    imgBtn: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 16,
    },
    viewUser: {
        marginTop: 60,
        alignItems: 'center',
    },
    txtUser: {
        fontSize: 16,
        color: colors.dusk,
        lineHeight: 48,
    },
    btnBottomWrapper: {
        position: 'absolute',
        bottom: 40,
    },
    btnLogin: {
        backgroundColor: colors.dodgerBlue,
        alignSelf: 'center',
        borderRadius: 4,
        width: 320,
        height: 52,

        alignItems: 'center',
        justifyContent: 'center',
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
