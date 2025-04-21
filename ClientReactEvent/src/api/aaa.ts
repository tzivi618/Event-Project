import { useCallback, useEffect, useState } from "react";
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
            // שליחת הבקשה באמצעות axios
            const result = await EventsInstance[method]<T>(url, ...params);
            setIsLoading(false);
            setData(result.data);
        } catch (error) {
            setIsLoading(false);
            setIsError('error while fetching data');
        }
    }, [url, method]); // הוספת url ו-method כתלות כדי לעדכן את הפונקציה כשמשתנים

    // שימוש ב-useEffect כדי לבצע בקשה אוטומטית כשיש שינוי במתודה או ב-url
    useEffect(() => {
        if (method === 'get') {
            request();
        }
    }, [method, request]); // הוספת method ו-request כתלות

    return { isLoading, error, data, request }; // החזרת הנתונים והפונקציה
}
