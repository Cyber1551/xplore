import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocationContext } from "../context/LocationContext";

const MapScreen = ({navigation}:any) => {
    console.log(navigation)
    const location = useLocationContext();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: location.currentLocation.lat,
                    longitude: location.currentLocation.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsMyLocationButton={true}
                loadingEnabled={true}
                followsUserLocation={true}
                showsUserLocation={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default MapScreen;
