import React, { ReactElement, useContext, useState } from "react";
import { useAxiosContext } from "./AxiosContext";
import { IHunt } from "../interfaces/Hunt";

export interface IHuntContext {
    huntList: IHunt[];
    huntListLoading: boolean;
    currentHunt: IHunt | undefined;
    updateHuntList: Function;
    joinHunt: Function;
    leaveHunt: Function;
    focusHunt: Function;
    clearFocusedHunt: Function;
    focusedHunt?: IHunt;
}

const HuntContext = React.createContext<IHuntContext>({
    huntList: [],
    huntListLoading: true,
    currentHunt: undefined,
    updateHuntList: Function,
    joinHunt: Function,
    leaveHunt: Function,
    focusHunt: Function,
    clearFocusedHunt: Function,
    focusedHunt: undefined
});

export const HuntProvider = (props: { children: ReactElement | ReactElement[] }) => {
    const [huntList, setHuntList] = useState<IHunt[]>([{
        huntId: 'testId1',
        location: {
            lat: 41.2475, //41.2475
            long: -96.0165 //-96.0165,
        },
        huntName: "Test Hunt"
    }, {
        huntId: 'testId2',
        location: {
            lat: 41.3500,
            long: -96.0270
        },
        huntName: "Test Hunt 2"
    }]);

    const [focusedHunt, setFocusedHunt] = useState<IHunt | undefined>(undefined);
    const [currentHunt, setCurrentHunt] = useState<IHunt | undefined>(undefined);

    const [huntListLoading, setHuntListLoading] = useState(false);

    const axiosContext = useAxiosContext();

    const focusHunt = (huntId: string) => {
        setFocusedHunt(getHuntById(huntId));
    }
    const clearFocusedHunt = () => {
        setFocusedHunt(undefined);
    }
    const updateHuntList = () => {
        setHuntListLoading(true);
        axiosContext.fetchHunts().then((res: any) => {
            if (res) {
                setHuntList(res.hunts);
            }
            setHuntListLoading(false);
        })
    }

    const getHuntById = (id: string) => {
        return huntList.find((s) => s.huntId == id);
    }

    const joinHunt = (huntId: string) => {
        axiosContext.joinHunt(huntId).then((res: any) => {
            setCurrentHunt(res);
        })
    }
    const leaveHunt = (huntId: string) => {
        axiosContext.leaveHunt(huntId).then((res: any) => {
            setCurrentHunt(undefined);
        })
    }

    return (
        <HuntContext.Provider value={{
            huntList,
            huntListLoading,
            currentHunt,
            updateHuntList,
            joinHunt,
            leaveHunt,
            focusHunt,
            clearFocusedHunt,
            focusedHunt
        }}>
            {props.children}
        </HuntContext.Provider>
    )
}

export const useHuntContext = (): IHuntContext => {
    const context = useContext<IHuntContext>(HuntContext);

    if (context === undefined) {
        throw new Error(`Error using DataProvider`);
    }
    return context;
};

export default HuntContext;
