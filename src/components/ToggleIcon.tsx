import React, { FC, useRef } from "react";
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { navigate } from "../utils/RootNavigation";

export interface IToggleIcon {
    navigateTo: string;
}
const ToggleIcon:FC<IToggleIcon> = ({navigateTo}) => {
    const ref = useRef<TransitioningView | null>(null);
    const onPressHandler = () => {
        navigate(navigateTo);
        ref.current?.animateNextTransition();
    }
    const getCurrentRoute = () => {
        if (navigateTo === 'mapScreen') return 'map'
        else return 'list';
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity
                onPress={onPressHandler}
                style={styles.button}
            >
                <Transitioning.View transition={transition} ref={ref}>
                    <SimpleLineIcons size={30} name={getCurrentRoute()} />
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
