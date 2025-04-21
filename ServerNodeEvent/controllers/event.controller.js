const express = require('express');
const app = express();
app.use(express.json());
const ModuleEvent = require('../modules/event.module');


const getEvent = async (req, res) => {
    try {
        const eventFind = await ModuleEvent.findOne({ eventName: req.params.eventName })
        res.status(200).send(eventFind);
    } catch (error) {
        res.status(400);
    }

}
const getEvents = async (req, res) => {
    try {
        const eventsFind = await ModuleEvent.find();
        res.status(200).send(eventsFind);
    } catch (error) {
        res.status(400);
    }

}
const createEvent = async (req, res) => {
    try {
        const newEvent = getEventFromBody(req);
        if (!newEvent.eventName || !newEvent.producerId)
            return res.status(400).send('producerId and name are require')
        if (ModuleEvent.findOne({ eventName: newEvent.eventName }))
            return res.status(400).send('event already exists')
        console.log(req.body.producerName);
        const event = new ModuleEvent(newEvent);
        await event.save();
        console.log('Producer added successfully:', event);
        res.status(200).send(newEvent);
    } catch (error) {
        console.error('Error adding producer:', error);
        res.status(400).send(error);
    }
};

const updateEvent = async (req, res) => {
    try {
        const newEvent = getEventFromBody(req); // שינינו כאן מ-getProducerFromBody ל-getEventFromBody
        console.log("----------------------");

        console.log(newEvent);
        console.log(req.params.eventName);

        const event = await ModuleEvent.findOneAndUpdate(
            { eventName: req.params.eventName },
            newEvent,
            { new: true } // מומלץ לשנות ל-true כדי להחזיר את האירוע המעודכן
        );
        res.status(200).send(event);
    } catch (error) {
        res.status(400).send(error);
        console.error('Error updating event:', error); // עדכון ההודעה
    }
};

const deleteEvent = async (req, res) => {
    try {
        // newEvent = getEventFromBody(req);
        const event = await ModuleEvent.deleteOne({ eventName: req.params.eventName });
        res.status(200).send(event);
    }
    catch (error) {
        res.status(400).send(error);
        console.error('Error adding producer:', error);
    }
};

const getEventFromBody = (req) => {
    const { eventName, eventDescription, producerId } = req.body;
    return newProducer = {
        eventName: eventName,
        eventDescription: eventDescription,
        producerId: producerId,

    }
};

module.exports = {
    createEvent,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
};