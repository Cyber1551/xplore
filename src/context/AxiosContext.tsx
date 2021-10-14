import React, { ReactElement, useContext} from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import * as SecureStore from 'expo-secure-store';

const SERVER_IP = "http://localhost:5000";

export interface IAxiosContext {
    login: Function;
    loginWithToken: Function;
    logout: Function;
    fetchHunts: Function;
    joinHunt: Function;
    leaveHunt: Function;
}

const AxiosContext = React.createContext<IAxiosContext>({
    login: Function,
    loginWithToken: Function,
    logout: Function,
    fetchHunts: Function,
    joinHunt: Function,
    leaveHunt: Function
});

export const AxiosProvider = (props: { children: ReactElement }) => {

    const unauthorized = () => {
        /*
        TODO: toast error and Redirect to login
         */
        return null;
    }
    const login = async (username: string, password:string) => {
       const res = await axios.post(`${SERVER_IP}/login`, {
            username: username,
            shaPassword: sha256(password)
        });
       return res.data;
    }

    const logout = async () => {
        const token = await SecureStore.getItemAsync('xplore_token');
        try {
            const res = await axios.post(`${SERVER_IP}/logout`,null,{
                headers: { 'Authorization' : `${token}`}
            });
            return res.data;
        } catch {
            return unauthorized();
        }
    }

    const loginWithToken = async (token: string) => {
        try {
            const res = await axios.post(`${SERVER_IP}/loginWithToken`, null, {
                headers: { 'Authorization' : `${token}`}
            });
            return res.data;
        } catch {
            return unauthorized();
        }

    }

    const fetchHunts = async () => {
        const token = await SecureStore.getItemAsync('xplore_token');
        try {
            const res = await axios.get(`${SERVER_IP}/hunts`, {
                headers: {'Authorization': `${token}`}
            });
            return res.data;
        }
        catch {
            return unauthorized();
        }
    }

    const joinHunt = async (huntId: string) => {
        const token = await SecureStore.getItemAsync('xplore_token');
        try {
            const res = await axios.post(`${SERVER_IP}/joinHunt`, {
                huntId: huntId
            }, {
                headers: {'Authorization': `${token}`}
            })
            return res.data;
        }
        catch {
            return unauthorized();
        }
    }

    const leaveHunt = async (huntId: string) => {
        const token = await SecureStore.getItemAsync('xplore_token');
        try {
            const res = await axios.post(`${SERVER_IP}/leaveHunt`, {
                huntId: huntId
            }, {
                headers: {'Authorization': `${token}`}
            })
            return res.data;
        }
        catch {
            return unauthorized();
        }
    }

    return (
        <AxiosContext.Provider value={{ login, loginWithToken, logout, fetchHunts, joinHunt, leaveHunt }}>
            {props.children}
        </AxiosContext.Provider>
    )
}

export const useAxiosContext = (): IAxiosContext => {
    const context = useContext<IAxiosContext>(AxiosContext);

    if (context === undefined) {
        throw new Error(`Error using DataProvider`);
    }
    return context;
};

export default AxiosContext;
