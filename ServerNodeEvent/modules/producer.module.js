
const mongoose = require('mongoose');

// התחברות למסד הנתונים
mongoose.connect('mongodb://localhost:27017/eventsTzivi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// הגדרת הסכימה
const { Schema, model } = mongoose;
const producerSchema = new Schema({
    producerName: { type: String, required: true }, // הוספת דרישה לשדות
    producerPhone: String,
    producerEmail: { type: String, required: true, unique: true }, // הוספת דרישה לאימייל
    producerDescription: String
});

// יצירת המודל
const ModuleProducer = model('Producer', producerSchema); // שם המודל עם אות גדולה
module.exports = ModuleProducer;
