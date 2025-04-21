import { createContext } from "react";
import { useHttp } from "../custom-hooks/useHttp";
import { Producer } from "../types/Producer";

type ProducerContextType = {
    producers: Producer[],
    refresh: () => Promise<unknown>,
}

export const ProducerContext = createContext<Partial<ProducerContextType>>({});

export const ProducerProvider = (props: any) => {
    const { data: producers, error, isLoading, request } = useHttp<Producer[]>('/producer', 'get');
    console.log("ProducerProvider");

    const contextValue: ProducerContextType = {
        producers: producers!,
        async refresh() {
            await request(); // רענון הנתונים על ידי קריאה ל-API
        }
    }

    return (
        <ProducerContext.Provider value={contextValue}>
            {isLoading && 'Loading'}
            {error && error}
            {!error && props.children}
        </ProducerContext.Provider>
    );
}
