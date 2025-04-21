import { createContext } from "react"
import { Events } from "../types/Events";
import { useHttp } from "../custom-hooks/useHttp";

type ActivityContextType = {
    activities: Events[],
    refresh: () => Promise<unknown>,

}

export const ActivityContext = createContext<Partial<ActivityContextType>>({});

export const ActivityProvider = (props: any) => {
    const { data: activities, error, isLoading, request } = useHttp<Events[]>('/event', 'get');
    console.log("ActivityProvider");

    const contextValue: ActivityContextType = {
        activities: activities!,
        async refresh() {
            await request();
        }
    }
    return <ActivityContext.Provider value={contextValue}>
        {isLoading && 'Loading'}
        {error && error}
        {!error && props.children}
    </ActivityContext.Provider>
}