// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ActivityContext } from "../../context/activity.context";
// import { useHttp } from "../../custom-hooks/useHttp";
// import { Events } from "../../types/Events";
// import { EditableField } from "./EditableField";

// export const EventDetailForProducerComponent = () => {
//     const { eventName } = useParams(); 
//     const [activity, setActivity] = useState<Events | undefined>(); 
//     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
//     const { isLoading: isLoadingPut, error: errorPut, request: requestPut } = useHttp<Events>(`/event/${eventName}`, 'put');
//     const { isLoading: isLoadingDelete, error: errorDelete, request: requestDelete } = useHttp<Events>(`/event/${eventName}`, 'delete');

//     const { refresh } = useContext(ActivityContext);
//     const navigate = useNavigate();

//     // קריאה לנתוני האירוע
//     useEffect(() => {
//         if (eventName) {
//             requestGet(); // קריאה מפורשת לשרת
//         }
//     }, [eventName, requestGet]);

//     // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
//     useEffect(() => {
//         if (dataGet) {
//             setActivity(dataGet); 
//         }
//     }, [dataGet]);

//     const updateField = (field: keyof Events, value: any) => {
//         setActivity(prevActivity => {
//             if (!prevActivity) return undefined; 
//             return {
//                 ...prevActivity, 
//                 [field]: value 
//             };
//         });
//     };

//     const updateEvent = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault(); // מונע רענון דף
//         if (activity) {
//             requestPut(activity); 
//             refresh?.(); 
//         }
//     };

//     const goBack = () => {
//         navigate(`/producer/${activity?.producerId}`);
//     };

//     const goBackAfterDelete = () => {
//         if (activity) {
//             requestDelete(activity);
//             refresh?.();
//             navigate(`/producer/${activity.producerId}`);
//         }
//     };

//     if (isLoadingGet) return <p>Loading...</p>;
//     if (errorGet) return <p>Error: {errorGet}</p>;

//     return (
//         <>
//             <button onClick={goBack}>חזור</button>
//             <h2>פרטי האירוע</h2>
//             <form onSubmit={updateEvent}>
//                 <EditableField
//                     value={activity ? activity.eventName : ''}
//                     setValue={(val: string) => updateField('eventName', val)}
//                 />
//                 <EditableField
//                     value={activity ? activity.eventDescription : ''}
//                     setValue={(val: string) => updateField('eventDescription', val)}
//                 />
//                 <button type="submit">שמור שינויים</button>
//             </form>
//             <button onClick={goBackAfterDelete}>מחק אירוע</button>
//         </>
//     );
// };

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivityContext } from "../../context/activity.context";
import { useHttp } from "../../custom-hooks/useHttp";
import { Events } from "../../types/Events";
import { EditableField } from "./EditableField";
import './eventDetailForProducer.css'; // ייבוא קובץ ה-CSS

export const EventDetailForProducerComponent = () => {
    const { eventName } = useParams(); 
    const [activity, setActivity] = useState<Events | undefined>(); 
    const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
    const { isLoading: isLoadingPut, error: errorPut, request: requestPut } = useHttp<Events>(`/event/${eventName}`, 'put');
    const { isLoading: isLoadingDelete, error: errorDelete, request: requestDelete } = useHttp<Events>(`/event/${eventName}`, 'delete');

    const { refresh } = useContext(ActivityContext);
    const navigate = useNavigate();

    // קריאה לנתוני האירוע
    useEffect(() => {
        if (eventName) {
            requestGet(); // קריאה מפורשת לשרת
        }
    }, [eventName, requestGet]);

    // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
    useEffect(() => {
        if (dataGet) {
            setActivity(dataGet); 
        }
    }, [dataGet]);

    const updateField = (field: keyof Events, value: any) => {
        setActivity(prevActivity => {
            if (!prevActivity) return undefined; 
            return {
                ...prevActivity, 
                [field]: value 
            };
        });
    };

    const updateEvent = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // מונע רענון דף
        if (activity) {
            requestPut(activity); 
            refresh?.(); 
        }
    };

    const goBack = () => {
        navigate(`/producer/${activity?.producerId}`);
    };

    const goBackAfterDelete = () => {
        if (activity) {
            requestDelete(activity);
            refresh?.();
            navigate(`/producer/${activity.producerId}`);
        }
    };

    if (isLoadingGet) return <p>Loading...</p>;
    if (errorGet) return <p>Error: {errorGet}</p>;

    return (
        <div className="event-container">
            <button onClick={goBack}>חזרה</button>
            <h2>פרטי האירוע</h2>
            <form onSubmit={updateEvent}>
                <EditableField
                    value={activity ? activity.eventName : ''}
                    setValue={(val: string) => updateField('eventName', val)}
                />
                <EditableField
                    value={activity ? activity.eventDescription : ''}
                    setValue={(val: string) => updateField('eventDescription', val)}
                />
                <button type="submit">שמירת שינויים</button>
            </form>
            <button onClick={goBackAfterDelete} className="delete-button">מחיקת אירוע</button>
        </div>
    );
};