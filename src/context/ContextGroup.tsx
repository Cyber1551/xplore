import React, { ReactElement } from "react";
import {LocationProvider} from '../context/LocationContext';

const ContextGroup = (props: {children: ReactElement | ReactElement[]}) => {
    return (
            <LocationProvider>
                {props.children}
            </LocationProvider>
    )
}
export default ContextGroup;
