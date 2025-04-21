// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { Events } from "../../types/Events";
// // // // import { useHttp } from "../../custom-hooks/useHttp";
// // // // import { Producer } from "../../types/Producer";

// // // // export const EventDetailForUserComponent = () => {
// // // //     const { eventName } = useParams();
// // // //     const navigate = useNavigate(); // יצירת ה-hook לניווט
// // // //     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
// // // //     const [event, setEvent] = useState<Events | undefined>();
// // // //     const [producer, setProducer] = useState<Producer | undefined>();
// // // //     const { isLoading: isLoadingGetProducer, error: errorGetProducer, data: dataGetProducer, request: requestGetProducer } = useHttp<Producer>(`/producer/${event?.producerId}`, 'get');

// // // //     // קריאה לנתוני האירוע
// // // //     useEffect(() => {
// // // //         requestGet(); // טוען את פרטי האירוע
// // // //     }, [requestGet]);

// // // //     // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
// // // //     useEffect(() => {
// // // //         if (dataGet) {
// // // //             setEvent(dataGet); // עדכון פרטי האירוע
// // // //         }
// // // //     }, [dataGet]);

// // // //     // קריאה לנתוני המפיק כאשר יש producerId
// // // //     useEffect(() => {
// // // //         if (event?.producerId) {
// // // //             requestGetProducer(); // טוען את פרטי המפיק
// // // //         }
// // // //     }, [event?.producerId, requestGetProducer]);

// // // //     // עדכון הסטייט של המפיק כאשר הנתונים מתקבלים
// // // //     useEffect(() => {
// // // //         if (dataGetProducer) {
// // // //             setProducer(dataGetProducer); // עדכון פרטי המפיק
// // // //         }
// // // //     }, [dataGetProducer]);

// // // //     return (
// // // //         <>
// // // //             <h1>שם האירוע: {event?.eventName} </h1>
// // // //             <h2>תיאור: {event?.eventDescription}</h2>
// // // //             <h1>פרטי המפיק</h1>
// // // //             {isLoadingGetProducer && <p>טוען נתוני מפיק...</p>}
// // // //             {errorGetProducer && <p>שגיאה בטעינת נתוני המפיק: {errorGetProducer.toString()}</p>}
// // // //             {producer && (
// // // //                 <>
// // // //                     <h2>שם המפיק: {producer.producerName}</h2>
// // // //                     <h3>טלפון: {producer.producerPhone}</h3>
// // // //                     <h3>אימייל: {producer.producerEmail}</h3>
// // // //                 </>
// // // //             )}
// // // //             {/* <button onClick={() => navigate('/users')} >
// // // //                 חזרה לרשימת האירועים
// // // //             </button> */}
// // // //         </>
// // // //     );
// // // // };
// // // import { useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { Events } from "../../types/Events";
// // // import { useHttp } from "../../custom-hooks/useHttp";
// // // import { Producer } from "../../types/Producer";

// // // export const EventDetailForUserComponent = () => {
// // //     const { eventName } = useParams();
// // //     const navigate = useNavigate();
// // //     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
// // //     const [event, setEvent] = useState<Events | undefined>();
// // //     const [producer, setProducer] = useState<Producer | undefined>();
// // //     const { isLoading: isLoadingGetProducer, error: errorGetProducer, data: dataGetProducer, request: requestGetProducer } = useHttp<Producer>(`/producer/${event?.producerId}`, 'get');

// // //     // קריאה לנתוני האירוע
// // //     useEffect(() => {
// // //         requestGet(); // טוען את פרטי האירוע
// // //     }, [requestGet]);

// // //     // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
// // //     useEffect(() => {
// // //         if (dataGet) {
// // //             setEvent(dataGet); // עדכון פרטי האירוע 
// // //             requestGetProducer(); // טוען את פרטי המפיק רק אם יש producerId

// // //         }
// // //         if (dataGetProducer) {
// // //             setProducer(dataGetProducer); // עדכון פרטי המפיק
// // //         }
// // //     }, [dataGet]);

// // //     // קריאה לנתוני המפיק כאשר יש producerId
// // //     // useEffect(() => {
// // //     //     if (event?.producerId) {
// // //     //         requestGetProducer(); // טוען את פרטי המפיק רק אם יש producerId
// // //     //     }
// // //     // }, [event?.producerId, requestGetProducer]);

// // //     // // עדכון הסטייט של המפיק כאשר הנתונים מתקבלים
// // //     // useEffect(() => {
// // //     //     if (dataGetProducer) {
// // //     //         setProducer(dataGetProducer); // עדכון פרטי המפיק
// // //     //     }
// // //     // }, [dataGetProducer]);

// // //     return (
// // //         <>
// // //             <h1>שם האירוע: {event?.eventName} </h1>
// // //             <h2>תיאור: {event?.eventDescription}</h2>
// // //             <h1>פרטי המפיק</h1>
// // //             {isLoadingGetProducer && <p>טוען נתוני מפיק...</p>}
// // //             {errorGetProducer && <p>שגיאה בטעינת נתוני המפיק: {errorGetProducer.toString()}</p>}
// // //             {producer && (
// // //                 <>
// // //                     <h2>שם המפיק: {producer.producerName}</h2>
// // //                     <h3>טלפון: {producer.producerPhone}</h3>
// // //                     <h3>אימייל: {producer.producerEmail}</h3>
// // //                 </>
// // //             )}
// // //             <button onClick={() => navigate('/users')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
// // //                 חזרה לרשימת האירועים
// // //             </button>
// // //         </>
// // //     );
// // // };
// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { Events } from "../../types/Events";
// // import { useHttp } from "../../custom-hooks/useHttp";
// // import { Producer } from "../../types/Producer";

// // export const EventDetailForUserComponent = () => {
// //     const { eventName } = useParams();
// //     const navigate = useNavigate();
// //     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
// //     const [event, setEvent] = useState<Events | undefined>();
// //     const [producer, setProducer] = useState<Producer | undefined>();
// //     const { isLoading: isLoadingGetProducer, error: errorGetProducer, data: dataGetProducer, request: requestGetProducer } = useHttp<Producer>(`/producer/${event?.producerId}`, 'get');

// //     // קריאה לנתוני האירוע
// //     useEffect(() => {
// //         requestGet(); // טוען את פרטי האירוע
// //     }, [requestGet]);

// //     // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
// //     useEffect(() => {
// //         if (dataGet) {
// //             setEvent(dataGet); // עדכון פרטי האירוע
// //         }
// //     }, [dataGet]);

// //     // קריאה לנתוני המפיק כאשר יש producerId
// //     useEffect(() => {
// //         if (event?.producerId) {
// //             requestGetProducer(); // טוען את פרטי המפיק רק אם יש producerId
// //         }
// //     }, [event?.producerId, requestGetProducer]);

// //     // עדכון הסטייט של המפיק כאשר הנתונים מתקבלים
// //     useEffect(() => {
// //         if (dataGetProducer) {
// //             setProducer(dataGetProducer); // עדכון פרטי המפיק
// //         }
// //     }, [dataGetProducer]);

// //     return (
// //         <>
// //             <h1>שם האירוע: {event?.eventName} </h1>
// //             <h2>תיאור: {event?.eventDescription}</h2>
// //             <h1>פרטי המפיק</h1>
// //             {isLoadingGetProducer && <p>טוען נתוני מפיק...</p>}
// //             {errorGetProducer && <p>שגיאה בטעינת נתוני המפיק: {errorGetProducer.toString()}</p>}
// //             {producer && (
// //                 <>
// //                     <h2>שם המפיק: {producer.producerName}</h2>
// //                     <h3>טלפון: {producer.producerPhone}</h3>
// //                     <h3>אימייל: {producer.producerEmail}</h3>
// //                 </>
// //             )}
// //             <button onClick={() => navigate('/users')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
// //                 חזרה לרשימת האירועים
// //             </button>
// //         </>
// //     );
// // };
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Events } from "../../types/Events";
// import { useHttp } from "../../custom-hooks/useHttp";
// import { Producer } from "../../types/Producer";

// export const EventDetailForUserComponent = () => {
//     const { eventName } = useParams();
//     const navigate = useNavigate();
//     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
//     const [event, setEvent] = useState<Events | undefined>();
//     const [producer, setProducer] = useState<Producer | undefined>();
//     const { isLoading: isLoadingGetProducer, error: errorGetProducer, data: dataGetProducer, request: requestGetProducer } = useHttp<Producer>(`/producer/${event?.producerId}`, 'get');

//     // קריאה לנתוני האירוע
//     useEffect(() => {
//         requestGet(); // טוען את פרטי האירוע
//     }, [requestGet]);

//     // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
//     useEffect(() => {
//         if (dataGet) {
//             setEvent(dataGet); // עדכון פרטי האירוע
//         }
//     }, [dataGet]);

//     // קריאה לנתוני המפיק כאשר יש producerId
//     useEffect(() => {
//         if (event?.producerId) {
//             requestGetProducer(); // טוען את פרטי המפיק רק אם יש producerId
//         }
//     }, [event?.producerId, requestGetProducer]);

//     // עדכון הסטייט של המפיק כאשר הנתונים מתקבלים
//     useEffect(() => {
//         if (dataGetProducer) {
//             setProducer(dataGetProducer); // עדכון פרטי המפיק
//         }
//     }, [dataGetProducer]);

//     return (
//         <>
//             <h1>שם האירוע: {event?.eventName} </h1>
//             <h2>תיאור: {event?.eventDescription}</h2>
//             <h1>פרטי המפיק</h1>
//             {isLoadingGetProducer && <p>טוען נתוני מפיק...</p>}
//             {errorGetProducer && <p>שגיאה בטעינת נתוני המפיק: {errorGetProducer.toString()}</p>}
//             {producer && (
//                 <>
//                     <h2>שם המפיק: {producer.producerName}</h2>
//                     <h3>טלפון: {producer.producerPhone}</h3>
//                     <h3>אימייל: {producer.producerEmail}</h3>
//                 </>
//             )}
//             <button onClick={() => navigate('/users')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//                 חזרה לרשימת האירועים
//             </button>
//         </>
//     );
// };
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Events } from "../../types/Events";
import { useHttp } from "../../custom-hooks/useHttp";
import { Producer } from "../../types/Producer";
import './eventDetailForUser.css'; // ייבוא קובץ ה-CSS

export const EventDetailForUserComponent = () => {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events>(`/event/${eventName}`, 'get');
    const [event, setEvent] = useState<Events | undefined>();
    const [producer, setProducer] = useState<Producer | undefined>();
    const { isLoading: isLoadingGetProducer, error: errorGetProducer, data: dataGetProducer, request: requestGetProducer } = useHttp<Producer>(`/producer/${event?.producerId}`, 'get');

    // קריאה לנתוני האירוע
    useEffect(() => {
        requestGet(); // טוען את פרטי האירוע
    }, [requestGet]);

    // עדכון הסטייט של האירוע כאשר הנתונים מתקבלים
    useEffect(() => {
        if (dataGet) {
            setEvent(dataGet); // עדכון פרטי האירוע
        }
    }, [dataGet]);

    // קריאה לנתוני המפיק כאשר יש producerId
    useEffect(() => {
        if (event?.producerId) {
            requestGetProducer(); // טוען את פרטי המפיק רק אם יש producerId
        }
    }, [event?.producerId, requestGetProducer]);

    // עדכון הסטייט של המפיק כאשר הנתונים מתקבלים
    useEffect(() => {
        if (dataGetProducer) {
            setProducer(dataGetProducer); // עדכון פרטי המפיק
        }
    }, [dataGetProducer]);

    return (
        <div className="event-container">
            <h1>{event?.eventName}</h1>
            <h2>{event?.eventDescription}</h2>
            <h1>פרטי המפיקה</h1>
            {isLoadingGetProducer && <p>טוען נתוני המפיקה</p>}
            {errorGetProducer && <p className="error">שגיאה בטעינת נתוני המפיקה: {errorGetProducer.toString()}</p>}
            {producer && (
                <>
                    <h3>{producer.producerName}</h3>
                    <h3>{producer.producerPhone}</h3>
                    <h3>{producer.producerEmail}</h3>
                </>
            )}
            <button onClick={() => navigate('/users')}>חזרה לרשימת האירועים</button>
        </div>
    );
};