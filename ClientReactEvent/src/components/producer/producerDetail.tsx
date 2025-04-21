// import React, { useContext, useEffect, useState } from 'react';
// import { useHttp } from '../../custom-hooks/useHttp';
// import { Producer } from '../../types/Producer';
// import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
// import { ActivityContext } from "../../context/activity.context";
// import { EditableField } from './EditableField'; // הוספת ייבוא של EditableField

// export const ProducerDetailComponent = () => {
//     const { email } = useParams(); // קבלת ה-id מה-URL
//     const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Producer>(`/producer/${email}`, 'get');
//     const { isLoading: isLoadingPut, error: errorPut, data: dataPut, request: requestPut } = useHttp<Producer>(`/producer/${email}`, 'put');

//     const [currentProducer, setCurrentProducer] = useState<Producer | null>(null);
//     const { activities, refresh } = useContext(ActivityContext); // שימוש בהקשר לפעילויות
//     const [myActivities, setMyActivities] = useState<Event[]>([]);
//     const navigate = useNavigate();

//     // קריאה לשרת כדי לקבל את הנתונים
//     useEffect(() => {
//         requestGet();
//         refresh?.();
//     }, [email, requestGet]);

//     // עדכון המפיק הנוכחי כאשר הנתונים משתנים
//     useEffect(() => {
//         if (dataGet) {
//             setCurrentProducer(dataGet);
//         }
//     }, [dataGet]);

//     // סינון פעילויות לפי המפיק הנוכחי
//     useEffect(() => {
//         if (activities && email) {
//             setMyActivities(activities.filter(act => act.producerId === email));
//         }
//     }, [activities, email]);

//     const updateProducer = async () => {
//         console.log("currentProducer");
//         console.log(currentProducer);

//         if (currentProducer) {
//             await requestPut({ ...currentProducer }, 'put'); // שלח את הנתונים המעודכנים לשרת
//             refresh!(); // רענן את הקונטקסט
//         }
//     };

//     if (isLoadingGet) return <div>Loading...</div>;
//     if (errorPut) return <div>{errorPut.toString()}</div>;

//     return (
//         <div>
//             <h2>פרטי המפיקה</h2>
//             <form  onSubmit={updateProducer}>
            
//             <EditableField
//                 value={currentProducer?.producerName || ''}
//                 setValue={(val) => setCurrentProducer(prev => prev ? { ...prev, producerName: val } : prev)}
//             />
//             <EditableField
//                 value={currentProducer?.producerPhone || ''}
//                 setValue={(val) => setCurrentProducer(prev => prev ? { ...prev, producerPhone: val } : prev)}
//             />
//             <label>
//                 {currentProducer?.producerEmail }
//             </label>
//             <EditableField
//                 value={currentProducer?.producerDescription || ''}
//                 setValue={(val) => setCurrentProducer(prev => prev ? { ...prev, producerDescription: val } : prev)}
//             />
//             <button type='submit' >שמירת שינויים</button> {/* כפתור שמירה */}
//             </form>
//             <div>
//                 <h2>הארועים שלך</h2>
//                 <ul>
//                     {myActivities.map(activity => (
//                         <li key={activity.eventName}>
//                             <NavLink to={`${activity.eventName}`}>{activity.eventName}</NavLink>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <Outlet/>
//             <NavLink to={`/producer/${email}/addEvent`} >הוסף אירוע</NavLink>
//         </div>
//     );
// };
import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../../custom-hooks/useHttp';
import { Producer } from '../../types/Producer';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { ActivityContext } from "../../context/activity.context";
import { EditableField } from './EditableField';
import './producerDetail.css'; // ייבוא קובץ ה-CSS

export const ProducerDetailComponent = () => {
    const { email } = useParams(); // קבלת ה-id מה-URL
    const { isLoading: isLoadingGet, error: errorGet, data: dataGet, request: requestGet } = useHttp<Producer>(`/producer/${email}`, 'get');
    const { isLoading: isLoadingPut, error: errorPut, request: requestPut } = useHttp<Producer>(`/producer/${email}`, 'put');

    const [currentProducer, setCurrentProducer] = useState<Producer | null>(null);
    const [hasChanges, setHasChanges] = useState(false); // מעקב אחרי שינויים
    const { activities, refresh } = useContext(ActivityContext);
    const [myActivities, setMyActivities] = useState<Event[]>([]);
    const navigate = useNavigate();

    // קריאה לשרת כדי לקבל את הנתונים
    useEffect(() => {
        requestGet();
        refresh?.();
    }, [email, requestGet]);

    // עדכון המפיקה הנוכחית כאשר הנתונים משתנים
    useEffect(() => {
        if (dataGet) {
            setCurrentProducer(dataGet);
        }
    }, [dataGet]);

    // סינון פעילויות לפי המפיקה הנוכחית
    useEffect(() => {
        if (activities && email) {
            setMyActivities(activities.filter(act => act.producerId === email));
        }
    }, [activities, email]);

    const updateProducer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentProducer) {
            await requestPut(currentProducer); // שלח את הנתונים המעודכנים לשרת
            refresh?.();
            setHasChanges(false); // איפוס מצב השינויים
        }
    };

    const handleFieldChange = (field: keyof Producer, value: string) => {
        setCurrentProducer(prev => {
            if (!prev) return null;
            setHasChanges(true); // עדכון מצב השינויים
            return { ...prev, [field]: value };
        });
    };

    if (isLoadingGet) return <div>טוען נתונים...</div>;
    if (errorGet) return <div>שגיאה בטעינת הנתונים: {errorGet.toString()}</div>;

    return (
        <div className="producer-container">
            <h2>פרטי המפיקה</h2>
            <form onSubmit={updateProducer}>
                <EditableField
                    value={currentProducer?.producerName || ''}
                    setValue={(val) => handleFieldChange('producerName', val)}
                />
                <EditableField
                    value={currentProducer?.producerPhone || ''}
                    setValue={(val) => handleFieldChange('producerPhone', val)}
                />
                <label>{currentProducer?.producerEmail}</label>
                <EditableField
                    value={currentProducer?.producerDescription || ''}
                    setValue={(val) => handleFieldChange('producerDescription', val)}
                />
                <button type="submit" className="save-button" disabled={!hasChanges}>
                    שמירת שינויים
                </button>
            </form>
            <div>
                <h2>האירועים שלך</h2>
                <ul>
                    {myActivities.map(activity => (
                        <li key={activity.eventName}>
                            <NavLink to={`${activity.eventName}`}>{activity.eventName}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <Outlet />
            <NavLink to={`/producer/${email}/addEvent`} className="add-event-button">
                הוספת אירוע
            </NavLink>
        </div>
    );
};