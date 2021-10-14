import { ILocation } from "../context/LocationContext";

export interface IHunt {
    huntId: string;
    location: ILocation;
    huntName: string;
}
