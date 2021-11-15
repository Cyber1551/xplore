import * as React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocationContext } from "../context/LocationContext";
import { useHuntContext } from "../context/HuntContext";
import ToggleIcon from "../components/ToggleIcon";


const MapScreen = ({navigation}:any) => {
    const location = useLocationContext();
    const huntContext = useHuntContext();

    const {width, height} = Dimensions.get('window');

    const CARD_HEIGHT = height / 4;
    const CARD_WIDTH = CARD_HEIGHT - 50;

    let index = 0;
    let animation = new Animated.Value(0);


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={location.currentLocation && {
                    latitude: location.currentLocation.lat,
                    longitude: location.currentLocation.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={huntContext.focusedHunt && {
                    latitude: huntContext.focusedHunt.location.lat,
                    longitude: huntContext.focusedHunt.location.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPanDrag={() => {
                    huntContext.clearFocusedHunt();
                }}
                showsMyLocationButton={true}
                loadingEnabled={true}
                followsUserLocation={true}
                showsUserLocation={true}
            >
                {huntContext.huntList.map((hunt) => {
                    return <Marker key={hunt.huntId} coordinate={{
                        latitude: hunt.location.lat,
                        longitude: hunt.location.long
                    }}>
                        <Animated.View style={[styles2.markerWrap]}>
                            <Animated.View style={[styles2.ring]}/>
                            <View style={[styles2.marker]} />
                        </Animated.View>
                    </Marker>
                })}
            </MapView>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: animation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
                style={styles2.scrollView}
                contentContainerStyle={styles2.endPadding}
            >
                {huntContext.huntList.map((marker, index) => (
                    <View style={styles2.card} key={index}>
                        <View style={styles2.textContent}>
                            <Text numberOfLines={1} style={styles2.cardtitle}>{marker.huntName}</Text>
                            <Text numberOfLines={1} style={styles2.cardDescription}>{marker.huntId}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
            <ToggleIcon navigateTo={'listScreen'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});


const styles2 = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});
export default MapScreen;
