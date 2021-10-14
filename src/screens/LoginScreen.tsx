import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useUserContext } from "../context/UserContext";

const LoginScreen = ({navigation}: any) => {
    const auth = useUserContext();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            {auth.loading ? <ActivityIndicator /> : <>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    style={styles.input}
                />
                <View style={{marginBottom: 15}} />
                <TouchableOpacity onPress={() => {
                    auth.dummyLogin();
                }}><Text style={styles.button}>LOGIN</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('registerScreen');
                }}><Text style={styles.button}>REGISTER</Text></TouchableOpacity>
            </>}

        </View>)
}

export default LoginScreen;

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
