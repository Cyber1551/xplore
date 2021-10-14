import * as React from "react";
import { navigationRef } from "../utils/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";


const NavigatorWrapper = () => {

    return (
        <NavigationContainer ref={navigationRef}>
            <StackNavigator />
        </NavigationContainer>
    )

}
export default NavigatorWrapper;
