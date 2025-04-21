import axios from "axios";
import { Producer } from "../types/Producer";


const ProducerInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createNewProducer = async (producer: Producer): Promise<Producer> => {
    const response = await ProducerInstance.post('/producer', producer);
    console.log("api");
    
    return response.data;
}

export const updateProducer = async (producer: Producer): Promise<Producer> => {
    const email = producer.producerEmail;
    const response = await ProducerInstance.put(`/producer/${email}`, producer);
    console.log(response.data);
    console.log("api");

    return response.data;
}

export const getProducer = async (email: any): Promise<Producer> => {
    const response = await ProducerInstance.get(`/producer/${email}`);
    console.log(response.data);
    console.log("api");

    return response.data;
}
export const ApiRequests = {
    createNewProducer,
    updateProducer,
    getProducer
} as const

type Keys = keyof typeof ApiRequests;
export type RequestMethods = typeof ApiRequests[Keys];
