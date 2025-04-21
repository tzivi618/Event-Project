// import { useContext, useState } from "react";
// import { ActivityContext } from "../../context/activity.context";
// import { useHttp } from "../../custom-hooks/useHttp";
// import { useNavigate, useParams } from "react-router-dom";
// // import './addEvent.css';
// export const AddEventComponent = () => {
//     const { email } = useParams(); // קבלת ה-email מה-URL
//     const { refresh } = useContext(ActivityContext);
//     const { isLoading, error, request } = useHttp('/event', 'post');
//     const [eventName, setEventName] = useState('');
//     const [eventDescription, setEventDescription] = useState('');
//     const navigate = useNavigate(); // ייבוא ה-hook לניווט  
//     const handleSubmit = async (e: any) => {
//         e.preventDefault(); // מונע רענון דף
//         const eventData = { eventName, eventDescription, producerId: email }; // יצירת אובייקט נתונים עם ה-email

//         try {
//             await request(eventData);
//             refresh!(); // רענן את הקונטקסט אחרי הוספת האירוע
//             setEventName(''); // נקה את השדות
//             setEventDescription('');
//             navigate(`/producer/${email}`); // ניווט לדף המפיק
//         } catch (err) {
//             console.error('Error adding event:', err);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="eventName">שם האירוע</label><br />
//             <input
//                 type="text"
//                 name="eventName"
//                 value={eventName}
//                 onChange={(e) => setEventName(e.target.value)}
//             />
//             <label htmlFor="eventDescription">תיאור</label><br />
//             <input
//                 type="text"
//                 name="eventDescription"
//                 value={eventDescription}
//                 onChange={(e) => setEventDescription(e.target.value)}
//             />
//             <button type="submit" disabled={isLoading}>
//                 {isLoading ? 'ממתין...' : 'הוסף אירוע'}
//             </button>
//             {error && <p>שגיאה: {error}</p>} {/* העברתי את זה ל-return */}
//         </form>
//     );
// }
import { useContext, useState } from "react";
import { ActivityContext } from "../../context/activity.context";
import { useHttp } from "../../custom-hooks/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import './addEvent.css'; // ייבוא קובץ ה-CSS

export const AddEventComponent = () => {
    const { email } = useParams(); // קבלת ה-email מה-URL
    const { refresh } = useContext(ActivityContext);
    const { isLoading, error, request } = useHttp('/event', 'post');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const navigate = useNavigate(); // ייבוא ה-hook לניווט  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // מונע רענון דף
        const eventData = { eventName, eventDescription, producerId: email }; // יצירת אובייקט נתונים עם ה-email

        try {
            await request(eventData);
            refresh!(); // רענן את הקונטקסט אחרי הוספת האירוע
            setEventName(''); // נקה את השדות
            setEventDescription('');
            navigate(`/producer/${email}`); // ניווט לדף המפיק
        } catch (err) {
            console.error('Error adding event:', err);
        }
    };

    return (
        <div className="form-container">
            <h1>הוספת אירוע</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="eventName">שם האירוע</label>
                <input
                    type="text"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <label htmlFor="eventDescription">תיאור</label>
                <input
                    type="text"
                    name="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'ממתין...' : 'הוסף אירוע'}
                </button>
                {error && <p>שגיאה: {error}</p>}
            </form>
        </div>
    );
};