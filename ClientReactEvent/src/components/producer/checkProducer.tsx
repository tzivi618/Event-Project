// // // import { useState } from "react";
// // // import { useHttp } from "../../custom-hooks/useHttp";
// // // import { NavLink, useNavigate } from "react-router-dom";

// // // export const CheckProducerComponent = () => {
// // //     const [inputValue, setInputValue] = useState('');
// // //     const { request, isLoading, error, data } = useHttp<{ }>(`/producer/${inputValue}`, 'get');
// // //     const navigate = useNavigate(); // ייבוא ה-hook לניווט

// // //     const checkEmailOfProducer = async (event: React.FormEvent<HTMLFormElement>) => {
// // //         event.preventDefault();
// // //         try {
// // //             const response = await request(); // מחכים לתוצאה של קריאת ה-HTTP
// // //             console.log("1c111");

            

// // //             if (response) {
// // //                 // alert(`המפיק קיים: ${response.producerName}`);
// // //                 // navigate(`/producer/${encodeURIComponent(inputValue)}`); // ניווט לקומפוננטה עם המייל כפרמטר ב-URL
// // //             } else {
// // //                 alert("לא נמצא כזה משתמש");
// // //             }
// // //         } catch (err) {
// // //             alert("שגיאה בבקשה");
// // //             console.error(err);
// // //         }
// // //         navigate(`/producer/${inputValue}`);
// // //     }

// // //     return (
// // //         <>
// // //             <form onSubmit={checkEmailOfProducer}>
// // //                 <label htmlFor="">הכנסי כתובת מייל</label><br />
// // //                 <input
// // //                     type="email"
// // //                     value={inputValue}
// // //                     onChange={(e) => setInputValue(e.target.value)}
// // //                 />
// // //                 <button disabled={isLoading}>שלח</button> {/* הכפתור יהיה מושבת בזמן טעינה */}
// // //             </form>

// // //             {isLoading && <p>טוען...</p>}
// // //             {error && <p>שגיאה: {error}</p>}
// // //         </>
// // //     );
// // // }
// // import { useState } from "react";
// // import { useHttp } from "../../custom-hooks/useHttp";
// // import { useNavigate } from "react-router-dom";

// // export const CheckProducerComponent = () => {
// //     const [inputValue, setInputValue] = useState('');
// //     const { request, isLoading, error } = useHttp(`/producer/${inputValue}`, 'get');
// //     const navigate = useNavigate();

// //     const checkEmailOfProducer = async (event: React.FormEvent<HTMLFormElement>) => {
// //         event.preventDefault(); // מניעת רענון הדף
// //         try {
// //             const response = await request(); // קריאת GET לשרת
// //             if (response !== undefined && response !== null) {
// //                 // אם המפיק קיים, נווט לדף המפיק
// //                 navigate(`/producer/${inputValue}`);
// //             } else {
// //                 // אם המפיק לא נמצא, הצג הודעת שגיאה
// //                 alert("לא נמצא מפיק עם כתובת המייל שהוזנה.");
// //             }
// //         } catch (err) {
// //             // טיפול בשגיאה
// //             alert("שגיאה בבקשה לשרת. נסה שוב מאוחר יותר.");
// //             console.error(err);
// //         }
// //     };

// //     return (
// //         <>
// //             <form onSubmit={checkEmailOfProducer}>
// //                 <label htmlFor="email">הכנס כתובת מייל:</label><br />
// //                 <input
// //                     id="email"
// //                     type="email"
// //                     value={inputValue}
// //                     onChange={(e) => setInputValue(e.target.value)}
// //                     required
// //                 />
// //                 <button type="submit" disabled={isLoading}>
// //                     {isLoading ? "טוען..." : "שלח"}
// //                 </button>
// //             </form>

// //             {error && <p style={{ color: 'red' }}>שגיאה: {error.toString()}</p>}
// //         </>
// //     );
// // };
// import { useState } from "react";
// import { useHttp } from "../../custom-hooks/useHttp";
// import { useNavigate } from "react-router-dom";
// import { Producer } from "../../types/Producer";

// export const CheckProducerComponent = () => {
//     const [inputValue, setInputValue] = useState('');
//     const { request, isLoading, error, data } = useHttp<Producer>(`/producer/${inputValue}`, 'get');
//     const navigate = useNavigate();

//     const checkEmailOfProducer = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault(); // מניעת רענון הדף
//         try {
//             await request(); // קריאת GET לשרת
//             if (data?.producerName) {
//                 // אם המפיק קיים, נווט לדף המפיק
//                 navigate(`/producer/${inputValue}`);
//             } else {
//                 // אם המפיק לא נמצא, הצג הודעת שגיאה
//                 alert("לא נמצא מפיק עם כתובת המייל שהוזנה.");
//             }
//         } catch (err) {
//             console.error("שגיאה בבקשה לשרת:", err);
//             alert("שגיאה בבקשה לשרת. נסה שוב מאוחר יותר.");
//         }
//     };

//     return (
//         <>
//             <form onSubmit={checkEmailOfProducer}>
//                 <label htmlFor="email">הכנס כתובת מייל:</label><br />
//                 <input
//                     id="email"
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     required
//                 />
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? "טוען..." : "שלח"}
//                 </button>
//             </form>

//             {error && <p style={{ color: 'red' }}>שגיאה: {error}</p>}
//         </>
//     );
// };
import { useState, useEffect } from "react";
import { useHttp } from "../../custom-hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { Producer } from "../../types/Producer";

export const CheckProducerComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const { request, isLoading, error, data } = useHttp<Producer>(`/producer/${encodeURIComponent(inputValue)}`, 'get');
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false); // סטייט לבדיקת המפיק

    const checkEmailOfProducer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // מניעת רענון הדף
        setIsChecked(false); // איפוס סטייט הבדיקה
        try {
            await request(); // קריאת GET לשרת
            setIsChecked(true); // עדכון סטייט הבדיקה לאחר הקריאה
        } catch (err) {
            console.error("שגיאה בבקשה לשרת:", err);
            alert("שגיאה בבקשה לשרת. נסה שוב מאוחר יותר.");
        }
    };

    useEffect(() => {
        if (isChecked) {
            if (data?.producerName) {
                // אם המפיק קיים, נווט לדף המפיק
                navigate(`/producer/${encodeURIComponent(inputValue)}`);
            } else {
                // אם המפיק לא נמצא, הצג הודעת שגיאה
                alert("לא נמצא מפיק עם כתובת המייל שהוזנה.");
            }
        }
    }, [isChecked, data, inputValue, navigate]);

    return (
        <>
            <form onSubmit={checkEmailOfProducer}>
                <label htmlFor="email">הכניסי כתובת מייל:</label><br />
                <input
                    id="email"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "טוען..." : "שליחה"}
                </button>
            </form>

            {/* {error && <p style={{ color: 'red' }}>שגיאה: {error}</p>} */}
        </>
    );
};