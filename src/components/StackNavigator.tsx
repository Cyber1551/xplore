import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserContext } from "../context/UserContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import ListScreen from "../screens/ListScreen";
import MapScreen from "../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import * as React from "react";

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    const auth = useUserContext();
    const getNavigator = () => {
        if (auth.isSignedIn) {
            return (<>
                <Stack.Navigator initialRouteName={'mapScreen'} screenOptions={{
                    headerTitle: (props) => <><SimpleLineIcons name={'menu'} size={25}/><Image
                        style={{ marginLeft: 10, resizeMode: 'contain', height: 50, width: 120 }}
                        source={require('../../assets/images/logo.png')}/></>,
                    headerBackVisible: false
                }}>
                    <Stack.Screen name={'mapScreen'} component={MapScreen} />
                    <Stack.Screen name={'listScreen'} component={ListScreen} />
                </Stack.Navigator>

            </>);
        } else {
            return (<>
                <Stack.Navigator initialRouteName={'loginScreen'} screenOptions={{
                    headerShown: false, headerBackVisible: false
                }}>
                    <Stack.Screen name={'loginScreen'} component={LoginScreen}/>
                    <Stack.Screen name={'registerScreen'} component={RegisterScreen}/>
                </Stack.Navigator>
            </>)
        }
    }
    return getNavigator();
}
export default StackNavigator;
