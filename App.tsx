import * as React from 'react';
import {  useWindowDimensions, View } from 'react-native';
import MapScreen from "./src/screens/MapScreen";
import ListScreen from "./src/screens/ListScreen";
import ContextGroup from "./src/context/ContextGroup";
import ToggleIcon from "./src/components/ToggleIcon";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "./src/utils/RootNavigation";
import {SimpleLineIcons} from "@expo/vector-icons";

const App = () => {
    const layout = useWindowDimensions();
    const Stack = createNativeStackNavigator();

    return (
        <ContextGroup>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={'mapScreen'} screenOptions={{headerTitle: (props) => <SimpleLineIcons name={'user'}>  Xplore</SimpleLineIcons>, headerBackVisible: false}}>
                    <Stack.Screen name={'mapScreen'} component={MapScreen} />
                    <Stack.Screen name={'listScreen'} component={ListScreen} />
                </Stack.Navigator>
                <ToggleIcon />
            </NavigationContainer>
        </ContextGroup>
    );
}

export default App;
