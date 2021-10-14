import React, { ReactElement } from "react";
import {LocationProvider} from './LocationContext';
import { AxiosProvider } from "./AxiosContext";
import { UserProvider } from "./UserContext";
import { HuntProvider } from "./HuntContext";

const ContextGroup = (props: {children: ReactElement | ReactElement[]}) => {
    return (
        <AxiosProvider>
            <LocationProvider>
                <UserProvider>
                    <HuntProvider>
                        {props.children}
                    </HuntProvider>
                </UserProvider>
            </LocationProvider>
        </AxiosProvider>
    )
}
export default ContextGroup;
