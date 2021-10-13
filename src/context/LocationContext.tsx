import React, { ReactElement, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { check } from "react-native-permissions";
import SimpleToast from "react-native-simple-toast";

export interface ILocation {
    lat: number;
    long: number;
}

export interface ILocationContext {
    currentLocation: ILocation
}


const LocationContext = React.createContext<ILocationContext>({
    currentLocation: {
        lat: 0,
        long: 0
    }
});

export const LocationProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [currentLocation, setCurrentLocation] = useState<ILocation>({
        lat: 0,
        long: 0
    });

    const checkForPermissions = async () => {
        const locationEnabled = await Location.hasServicesEnabledAsync();

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('uh problem');
            SimpleToast.show("This app requires location permissions");
            return null;
        }

        const location = await Location.getCurrentPositionAsync({});
        return location;
    }
    useEffect(() => {
        checkForPermissions().then((result) => {
            if (result !== null) {
                setCurrentLocation({
                    lat: result.coords.latitude,
                    long: result.coords.longitude
                })
            }
        })
    }, [])
    return (
        <LocationContext.Provider
            value={{
                currentLocation
            }}
            {...props}
        />
    );
};

export const useLocationContext = (): ILocationContext => {
    const context = useContext<ILocationContext>(LocationContext);
    if (context === undefined) {
        throw new Error("Must be inside provider");
    }
    return context;
};


export default LocationContext;
