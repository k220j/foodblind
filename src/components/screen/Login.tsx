import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

import User from '../../models/User'
import { signIn } from '../../apis/user'

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
        })
    }

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
                <View>
                    <Text>{this.props.store.user.email}</Text>
                    <Text>{this.props.store.user.password}</Text>
                    <Text>{this.props.store.user.company}</Text>
                </View>
            </View>
        );
    }

    private onLogin = () => {
        signIn(this.state.email, this.state.password, this.props.store.user);
    }
}

export default Login;
