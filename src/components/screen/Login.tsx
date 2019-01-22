import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

import User from '../../models/User'
// import { signIn } from '../../apis/user'

import { Button, BottomNavigation, COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

interface IProps {
    navigation?: any;
    store: any;
}

interface IState {
    isLoggingIn: boolean;
    loading: boolean;
    data: any;
    scene: number;
    email: string;
    password: string;
    token: string;
}

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
        marginBottom: 10
    }
});

@inject('store') @observer
class Login extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.setState({
            isLoggingIn: false,
            email: '',
            password: '', 
            token: '',
        })

        this.state = {
            isLoggingIn: false,
        }
    }

    // public componentDidMount = () => {
    //     this.setState({isLoggingIn: true})

    //     AsyncStorage.getItem('@app:session').then(token => {
    //         this.setState({token: token});
    //     });
    // }

    public render() {
        return(
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <Text style={styles.labelStyle}>ID</Text>
                <TextInput 
                    style= {styles.inputStyle} 
                    onChangeText={(text)=>{this.setState({email: text})}}
                />
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput 
                    secureTextEntry={true}
                    style= {styles.inputStyle} 
                    onChangeText={(text)=>{this.setState({password: text})}}
                />
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onLogin}
                    text="Submit"
                />
                <Button 
                    onPress={() => this.props.navigation.navigate('Register') }
                    text="회원가입"
                />  
                <View><Text> { this.state.token } </Text></View>
            </View>
        );
    }

    private onLogin = () => {
        this.props.store.signIn(this.state.email, this.state.password);
        this.setState({isLoggingIn: true})

        AsyncStorage.getItem('@app:session').then(token => {
            this.setState({token: token});
        });
    }
}

export default Login;
