// import { useCallback, useEffect, useState } from "react";
// import axios from "axios";

// // יצירת מופע של axios עם baseURL
// const EventsInstance = axios.create({
//     baseURL: 'http://localhost:5000',
// });

// // סוגי המתודולוגיות הנתמכות
// type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// // hook מותאם אישית - פונקציה שמתחילה ב-use
// export function useHttp<T>(url: string, method: HttpMethod) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setIsError] = useState('');
//     const [data, setData] = useState<T>();

//     // שימוש ב-useCallback כדי למנוע יצירה מחדש של הפונקציה בכל רינדור
//     const request = useCallback(async (...params: any[]) => {
//         setIsLoading(true);
//         setIsError('');
//         try {
//             console.log("url");

//             console.log(url);
//             const result = await EventsInstance[method]<T>(url, ...params);
//             setIsLoading(false);
//             setData(result.data);
//         } catch (error) {
//             setIsLoading(false);
//             setIsError(`error while fetching data:\n ${error}`);
//         }
//     }, []);


//     const setUrl = useCallback(async (newUrl: string) => {
//         url = newUrl;
//         if (method === 'get')
//             await request();
//     }, []);
//     useEffect(() => {
//         if (method === 'get') {
//             request();
//         }
//     }, [])

//     return { isLoading, error, data, request, setUrl }
// }
import { useCallback, useState } from "react";
import axios from "axios";

// יצירת מופע של axios עם baseURL
const EventsInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

// סוגי המתודולוגיות הנתמכות
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// hook מותאם אישית - פונקציה שמתחילה ב-use
export function useHttp<T>(url: string, method: HttpMethod) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setIsError] = useState('');
    const [data, setData] = useState<T>();

    // שימוש ב-useCallback כדי למנוע יצירה מחדש של הפונקציה בכל רינדור
    const request = useCallback(async (...params: any[]) => {
        setIsLoading(true);
        setIsError('');
        try {
            console.log("Requesting URL:", url);
            const result = await EventsInstance[method]<T>(url, ...params);
            setData(result.data); // עדכון הסטייט עם הנתונים שהתקבלו
        } catch (err: any) {
            setIsError(err.response?.data || 'שגיאה בבקשה לשרת');
        } finally {
            setIsLoading(false);
        }
    }, [url, method]);

    return { isLoading, error, data, request };
}