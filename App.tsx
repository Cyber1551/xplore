import * as React from 'react';
import {  useWindowDimensions, View } from 'react-native';
import ContextGroup from "./src/context/ContextGroup";
import NavigatorWrapper from "./src/components/NavigatorWrapper";

const App = () => {
    const layout = useWindowDimensions();

    return (
        <ContextGroup>
            <NavigatorWrapper />
        </ContextGroup>
    );
}

export default App;
