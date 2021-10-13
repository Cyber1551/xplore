import * as React from 'react';
import { createRef, useEffect } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import MapScreen from "./src/screens/MapScreen";
import ListScreen from "./src/screens/ListScreen";
import { Ionicons } from "@expo/vector-icons";
import { PermissionStatus } from 'expo-permissions';
import * as Location from 'expo-location';
import ContextGroup from "./src/context/ContextGroup";
import ToggleIcon from "./src/components/ToggleIcon";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { Screen } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./src/utils/RootNavigation";

const renderScene = SceneMap({
    map: MapScreen,
    list: ListScreen,
});

const App = () => {
    const layout = useWindowDimensions();
    const Stack = createNativeStackNavigator();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'map', icon: 'map' },
        { key: 'list', icon: 'list' },
    ]);

    return (
        <ContextGroup>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={'mapScreen'} screenOptions={{headerTitle: (props) => <Text>Test</Text>, headerBackVisible: false}}>
                    <Stack.Screen name={'mapScreen'} component={MapScreen} />
                    <Stack.Screen name={'listScreen'} component={ListScreen} />
                </Stack.Navigator>
                <ToggleIcon />
            </NavigationContainer>

            {/*<TabView*/}
            {/*    navigationState={{ index, routes }}*/}
            {/*    renderScene={renderScene}*/}
            {/*    renderTabBar={props => <TabBar renderIcon={({ route, focused, color }) => (*/}
            {/*        // @ts-ignore*/}
            {/*        <Ionicons name={route.icon} color={color}/>*/}
            {/*    )} {...props} />}*/}
            {/*    tabBarPosition={'bottom'}*/}
            {/*    onIndexChange={setIndex}*/}
            {/*    initialLayout={{ width: layout.width }}*/}
            {/*/>*/}
        </ContextGroup>
    );
}

export default App;
