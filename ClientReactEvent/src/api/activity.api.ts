import axios from "axios";
import { Events } from "../types/Events";

const EventsInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getActivities = async (): Promise<Events[]> => {
    const response = await EventsInstance.get<Events[]>('/event');
    return response.data;
}

export const createActivity = async (newEvent: Events): Promise<Events> => {
    const response = await EventsInstance.post<Events>('/event', newEvent);
    return response.data;
}
export const getActivityByName = async (name: any): Promise<Events> => {
    const response = await EventsInstance.get(`/event/${name}`);
    return response.data;
}

export const deleteActivity = async (id: any): Promise<Events> => {
    const response = await EventsInstance.delete(`/event/${id}`);
    return response.data;
}

export const updateActivity = async (id: any, event: Events): Promise<Events> => {
    const response = await EventsInstance.put(`/event/${id}`, event);
    console.log(response.data);
    return response.data;
}
export const ApiRequests = {
    getActivities,
    createActivity,
    deleteActivity,
    updateActivity,
} as const

type Keys = keyof typeof ApiRequests;
export type RequestMethod = typeof ApiRequests[Keys];