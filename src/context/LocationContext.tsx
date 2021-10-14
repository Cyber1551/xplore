import React, { ReactElement, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export interface ILocation {
    lat: number;
    long: number;
}

export interface ILocationContext {
    currentLocation?: ILocation
}

const LocationContext = React.createContext<ILocationContext>({
    currentLocation: undefined
});

export const LocationProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [currentLocation, setCurrentLocation] = useState<ILocation>();

    const checkForPermissions = async () => {
        //const locationEnabled = await Location.hasServicesEnabledAsync();

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('uh problem');
        }
        else {
            const location = await Location.getCurrentPositionAsync({});
            console.log(location.coords)
            setCurrentLocation({
                lat: location.coords.latitude,
                long: location.coords.longitude
            })
        }

    }
    useEffect(() => {
        checkForPermissions();
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
