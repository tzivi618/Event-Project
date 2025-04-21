const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventsTzivi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));
const { Schema, model } = mongoose;
const eventSchema = Schema({
    eventName: String,
    eventDescription:String,
    producerId:String
});
const ModuleEvent = model('event', eventSchema);
module.exports = ModuleEvent;
