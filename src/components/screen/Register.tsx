import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

import User from '../../models/User'
import { signUp } from '../../apis/user';

import { Button, RadioButton } from 'react-native-material-ui';

interface IProps {
    navigation?: any;
    store: any;
}

interface IState {
    isLoggingIn: boolean;
    email: string;
    password: string;
    age: number;
    gender: string;
    company: string;
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
class Register extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.setState({
            isLoggingIn: false,
            email: '',
            password: '',
            age: 0,
            gender: '',
            company: '',
        })

        this.state = {
            gender: 'M',
        }
    }

    public render() {
        return(
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Register
                </Text>
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput 
                    onChangeText={(text) => this.validate(text)}
                    style= {styles.inputStyle}
                    textContentType={'emailAddress'}
                 />
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    style= {styles.inputStyle}
                    textContentType={'password'}
                 />
                 <Text style={styles.labelStyle}>age</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({age: +text})}
                    style= {styles.inputStyle}
                 />
                <Text style={styles.labelStyle}>gender</Text>
                <Picker
                    style={{  }}
                    mode={"dialog"}
                    selectedValue={this.state.gender}
                    onValueChange={(gender) => this.setState({gender})}>
                <Picker.Item label="Male" value="M" />
                <Picker.Item label="Female" value="F" />
                </Picker>
                <Text style={styles.labelStyle}>Company</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({company: text})}
                    style= {styles.inputStyle}
                 />
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onLogin}
                    text="Submit"
                />
            </View>
        );
    }

    private onLogin = () => {
        signUp(
            this.state.email,
            this.state.password,
            this.state.age,
            this.state.gender,
            this.state.company
            );
        this.props.navigation.navigate('Login');
    }

    private validate = (email) => {
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(reg.test(email) === false) {
            console.log("Email is Not Correct");
            this.setState({email: email})
            return false;
        }
        else {
            this.setState({email: email})
            console.log("Email is Correct");
        }
    };
}

export default Register; 