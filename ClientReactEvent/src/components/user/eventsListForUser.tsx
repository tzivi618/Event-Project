// // import { useEffect, useState } from "react";
// // import { useHttp } from "../../custom-hooks/useHttp";
// // import { Events } from "../../types/Events";
// // import { useNavigate } from "react-router-dom";
// // import './eventsListForUser.css'; // ייבוא קובץ ה-CSS

// // export const EventsListForUserComponent = () => {
// //     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events[]>(`/event`, 'get'); // שים לב ל-Events[] (מערך)
// //     const [activities, setActivities] = useState<Events[]>([]);
// //     const [filteredActivities, setFilteredActivities] = useState<Events[]>([]);
// //     const [inputFilterValue, setInputFilterValue] = useState<string>('');
// //     const navigate = useNavigate(); // הוספת useNavigate לניווט

// //     useEffect(() => {
// //         requestGet();
// //     }, [requestGet]);

// //     useEffect(() => {
// //         if (dataGet) {
// //             setActivities(dataGet);
// //             setFilteredActivities(dataGet);
// //         }
// //     }, [dataGet]);

// //     useEffect(() => {
// //         setFilteredActivities(
// //             activities.filter((activity) =>
// //                 activity.eventName?.includes(inputFilterValue) // הוספת בדיקה אם eventName קיים
// //             )
// //         );
// //     }, [inputFilterValue, activities]); // עדכון הסינון רק כאשר inputFilterValue או activities משתנים

// //     const handleEventClick = (eventName: string) => {
// //         navigate(`/event/${eventName}`); // נווט לנתיב של האירוע
// //     };

// //     return (
// //         <>
// //             <h1>רשימת אירועים</h1>
// //             <label htmlFor="filter">סינון</label>
// //             <input
// //                 id="filter"
// //                 type="text"
// //                 value={inputFilterValue}
// //                 onChange={(e) => setInputFilterValue(e.target.value)}
// //             />

// //             {isLoadingGet && <p>טוען נתונים...</p>}
// //             {errorGet && <p>שגיאה: {errorGet.toString()}</p>}
// //             <ul>
// //                 {filteredActivities.map(activity => (
// //                     <li
// //                         key={activity.eventName}
// //                         onClick={() => handleEventClick(activity.eventName)} // קריאה לפונקציית הניווט
// //                     >
// //                         {activity.eventName}
// //                     </li>
// //                 ))}
// //             </ul>
// //         </>
// //     );
// // };
// import { useEffect, useState } from "react";
// import { useHttp } from "../../custom-hooks/useHttp";
// import { Events } from "../../types/Events";
// import { useNavigate } from "react-router-dom";
// import './eventsListForUser.css'; // ייבוא קובץ ה-CSS

// export const EventsListForUserComponent = () => {
//     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events[]>(`/event`, 'get'); // שים לב ל-Events[] (מערך)
//     const [activities, setActivities] = useState<Events[]>([]);
//     const [filteredActivities, setFilteredActivities] = useState<Events[]>([]);
//     const [inputFilterValue, setInputFilterValue] = useState<string>('');
//     const navigate = useNavigate(); // הוספת useNavigate לניווט

//     useEffect(() => {
//         requestGet();
//     }, [requestGet]);

//     useEffect(() => {
//         if (dataGet) {
//             setActivities(dataGet);
//             setFilteredActivities(dataGet);
//         }
//     }, [dataGet]);

//     useEffect(() => {
//         setFilteredActivities(
//             activities.filter((activity) =>
//                 activity.eventName?.includes(inputFilterValue) // הוספת בדיקה אם eventName קיים
//             )
//         );
//     }, [inputFilterValue, activities]); // עדכון הסינון רק כאשר inputFilterValue או activities משתנים

//     const handleEventClick = (eventName: string) => {
//         navigate(`/event/${eventName}`); // נווט לנתיב של האירוע
//     };

//     return (
//         <div className="events-list-container">
//             <h1>רשימת אירועים</h1>
//             <label htmlFor="filter">סינון לפי שם:</label>
//             <input
//                 id="filter"
//                 type="text"
//                 value={inputFilterValue}
//                 onChange={(e) => setInputFilterValue(e.target.value)}
//             />

//             {isLoadingGet && <p>טוען נתונים...</p>}
//             {errorGet && <p>שגיאה: {errorGet.toString()}</p>}
//            <div style={{textAlign: 'center'}}>
//             <ul>
//                 {filteredActivities.map(activity => (
//                     <li
//                         key={activity.eventName}
//                         onClick={() => handleEventClick(activity.eventName)} // קריאה לפונקציית הניווט
//                     >
//                         {activity.eventName}
//                     </li>
//                 ))}
//             </ul>
//             </div>
//         </div>
//     );
// };

import { useEffect, useState } from "react";
import { useHttp } from "../../custom-hooks/useHttp";
import { Events } from "../../types/Events";
import { useNavigate } from "react-router-dom";
import './eventsListForUser.css'; // ייבוא קובץ ה-CSS

export const EventsListForUserComponent = () => {
    const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Events[]>(`/event`, 'get'); // שים לב ל-Events[] (מערך)
    const [activities, setActivities] = useState<Events[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Events[]>([]);
    const [inputFilterValue, setInputFilterValue] = useState<string>('');
    const navigate = useNavigate(); // הוספת useNavigate לניווט

    // קריאה לנתוני האירועים בכל פעם שהדף נטען מחדש
    useEffect(() => {
        requestGet(); // קריאה לשרת
    }, [requestGet]);

    // עדכון רשימת הפעילויות כאשר הנתונים מתקבלים
    useEffect(() => {
        if (dataGet) {
            setActivities(dataGet);
            setFilteredActivities(dataGet);
        }
    }, [dataGet]);

    // סינון רשימת האירועים לפי הערך בשדה הסינון
    useEffect(() => {
        setFilteredActivities(
            activities.filter((activity) =>
                activity.eventName?.toLowerCase().includes(inputFilterValue.toLowerCase()) // סינון לפי שם האירוע (לא תלוי רישיות)
            )
        );
    }, [inputFilterValue, activities]); // עדכון הסינון רק כאשר inputFilterValue או activities משתנים

    const handleEventClick = (eventName: string) => {
        navigate(`/event/${eventName}`); // נווט לנתיב של האירוע
    };

    return (
        <div className="events-list-container">
            <h1>רשימת אירועים</h1>
            <label htmlFor="filter">סינון לפי שם:</label>
            <input
                id="filter"
                type="text"
                value={inputFilterValue}
                onChange={(e) => setInputFilterValue(e.target.value)}
            />

            {isLoadingGet && <p>טוען נתונים...</p>}
            {errorGet && <p>שגיאה: {errorGet.toString()}</p>}
            <div style={{ textAlign: 'center' }}>
                <ul>
                    {filteredActivities.map(activity => (
                        <li
                            key={activity.eventName}
                            onClick={() => handleEventClick(activity.eventName)} // קריאה לפונקציית הניווט
                        >
                            {activity.eventName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};