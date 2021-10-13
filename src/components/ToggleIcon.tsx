import React, { ElementType, FC, ReactElement, useRef, useState } from "react";
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigationContainerRef } from "@react-navigation/native";
import { navigate } from "../utils/RootNavigation";


const ToggleIcon = () => {
    const ref = useRef<TransitioningView | null>(null);
    const [toggled, setToggled] = useState(false);
    const t = useNavigationContainerRef();

    const toggle = () => setToggled(!toggled);
    const onPressHandler = () => {
        toggle();
        navigate(toggled ? 'mapScreen' : 'listScreen');
        ref.current?.animateNextTransition();
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity
                onPress={onPressHandler}
                style={styles.button}
            >
                <Transitioning.View transition={transition} ref={ref}>
                    <SimpleLineIcons size={30} name={toggled ? 'list' : 'map'} />
                </Transitioning.View>
            </TouchableOpacity>
        </View>

    )
}

const transition = (
    <Transition.Together>
        <Transition.Out type="scale" durationMs={100}  />
        <Transition.Change interpolation={'easeInOut'}/>
        <Transition.In type="scale" durationMs={100} delayMs={50} />
    </Transition.Together>
);


const styles = StyleSheet.create({
    button: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:65,
        height:65,
        backgroundColor:'#fff',
        borderRadius:50,
    },
    view: {
        position: 'absolute',
        bottom: 40,
        right: 40
    }
});

export default ToggleIcon;
