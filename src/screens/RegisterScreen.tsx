import React from "react";
import {
    ActivityIndicator,
    Button,
    Image, Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useUserContext } from "../context/UserContext";

const RegisterScreen = ({navigation}:any) => {

    const auth = useUserContext();

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Repeat'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <View style={{marginBottom: 15}} />
                <TouchableOpacity><Text style={styles.button}>REGISTER</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('loginScreen');
                }}><Text style={styles.button}>BACK</Text></TouchableOpacity>
        </View>)
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 300,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    button: {
        width: 200,
        height: 44,
        padding: 10,
        textAlign:'center',
        fontWeight:'bold',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }
});
