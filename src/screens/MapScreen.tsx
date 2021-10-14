import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocationContext } from "../context/LocationContext";
import { useHuntContext } from "../context/HuntContext";
import ToggleIcon from "../components/ToggleIcon";


const MapScreen = ({navigation}:any) => {
    const location = useLocationContext();
    const huntContext = useHuntContext();
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
                    }} />
                })}
            </MapView>
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

export default MapScreen;
