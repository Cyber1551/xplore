import React, { ReactElement, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/User";
import { useAxiosContext } from "./AxiosContext";
import * as SecureStore from 'expo-secure-store';

export interface IUserContext {
    currentUser: IUser | undefined;
    login: Function;
    logout: Function;
    loading: boolean;
    isSignedIn: boolean;
    dummyLogin: Function;
}

const UserContext = React.createContext<IUserContext>({
    currentUser: undefined,
    login: Function,
    logout: Function,
    loading: true,
    isSignedIn: false,
    dummyLogin: Function
});

export const UserProvider = (props: { children: ReactElement }) => {
    const axiosContext = useAxiosContext();

    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const isSignedIn = currentUser !== undefined;

    const attemptLoginWithToken = () => {
        setLoading(true);
        SecureStore.getItemAsync('xplore_token').then((token) => {
            if (token) {
                axiosContext.loginWithToken(token).then((res: any) => {
                    console.log(res);
                    if (res && res.success) {
                        setCurrentUser(res.user);
                        /*
                        TODO: Alert success
                         */
                    } else {
                        SecureStore.deleteItemAsync('xplore_token').then(() => {
                            /*
                            TODO: Alert failure
                             */
                        })
                    }
                    setLoading(false);
                });
            }
            else {
                setLoading(false);
            }
        })
    }


    useEffect(() => {
        attemptLoginWithToken();
    }, []);

    const login = (username: string, password: string, cb: Function) => {
        axiosContext.login(username, password).then((result: any) => {
            if (result.success) {

                SecureStore.setItemAsync('xplore_token', result.token).then(() => {
                    setCurrentUser({
                        username: username
                    });
                })

                /*
                TODO: Alert success
                 */
            } else {
                /*
                TODO: Alert incorrect credentials
                 */
            }
            cb();
        });
    }

    const logout = () => {
        axiosContext.logout().then(async (result: any) => {
            SecureStore.deleteItemAsync('xplore_token').then(() => {
                setCurrentUser(undefined);
            })
            /*
            TODO: alert success
             */
        });
    }

    const dummyLogin = () => {
        setCurrentUser({
            username: 'dummy user'
        })
    }

    return (
        <UserContext.Provider value={{ currentUser, login, logout, loading, isSignedIn, dummyLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = (): IUserContext => {
    const context = useContext<IUserContext>(UserContext);

    if (context === undefined) {
        throw new Error(`Error using DataProvider`);
    }
    return context;
};

export default UserContext;
