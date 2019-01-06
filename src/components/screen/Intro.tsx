import React, {Component} from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
    View,
    FlatList,
    InteractionManager,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {inject} from 'mobx-react/native';
import {getUserList} from '../../apis/sample';

import {ratio, colors} from '../../utils/Styles';
import {IC_MASK} from '../../utils/Icons';
import User from '../../models/User';
import {getString} from '../../../STRINGS';
import Button from '../shared/Button';

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

interface IProps {
    navigation?: any;
    store: any;
}

interface IState {
    isLoggingIn: boolean;
    loading: boolean;
    data: any;
}

@inject('store') @observer
class Page extends Component<IProps, IState> {
    private timer: any;

    constructor(props) {
        super(props);
        this.state = {
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

    public render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                        <View style={styles.flatview}>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text style={styles.email}>{item.content}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

export default Page;
