import { useHttp } from "../../custom-hooks/useHttp";
import { useState } from "react";
import { Producer } from "../../types/Producer";
import { useNavigate } from "react-router-dom";
import './addProducer.css'; // ייבוא קובץ ה-CSS

export const AddProducerComponent = () => {
    const { error, isLoading, request } = useHttp('/producer', 'post');
    const [showForm, setShowForm] = useState(true);
    const [submitError, setSubmitError] = useState<string>('');
    const navigate = useNavigate();

    const submitNewProducer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // מניעת רענון הדף

        const producerData: Producer = {
            producerName: event.currentTarget.producerName.value,
            producerPhone: event.currentTarget.producerPhone.value,
            producerEmail: event.currentTarget.producerEmail.value,
            producerDescription: event.currentTarget.producerDescription.value,
        };

        // בדיקה אם אחד מהשדות ריק
        if (!producerData.producerName || !producerData.producerPhone ||
            !producerData.producerEmail || !producerData.producerDescription) {
            setSubmitError('כל השדות חייבים להיות מלאים.'); // הודעת שגיאה עבור שדות ריקים
            return; // לא להמשיך לשלוח את הבקשה
        }

        try {
            await request(producerData); // שליחת הבקשה
            setShowForm(false);
            setSubmitError('');
            navigate(`/producer/${producerData.producerEmail}`);
        } catch (err) {
            setSubmitError('שגיאה בהוספת המפיקה.'); // הודעת שגיאה כללית
        }
    };

    return (
        <div className="form-container">
            <h1>מפיקה חדשה</h1>
            {(showForm || error) && (
                <form onSubmit={submitNewProducer}>
                    <label htmlFor="producerName">שם</label>
                    <input type="text" name="producerName" required />

                    <label htmlFor="producerPhone">מספר טלפון</label>
                    <input type="tel" name="producerPhone" required />

                    <label htmlFor="producerEmail">מייל</label>
                    <input type="email" name="producerEmail" required />

                    <label htmlFor="producerDescription">תאור</label>
                    <input type="text" name="producerDescription" required />

                    <button disabled={isLoading}>הוספה</button>
                </form>
            )}
            {submitError && <p>{submitError}</p>}
            {!showForm && !error && <p>המפיקה נוספה בהצלחה!</p>}
        </div>
    );
};