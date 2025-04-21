const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
} = require('../controllers/event.controller')

router.get('/', getEvents);
router.get('/:eventName', getEvent); 
router.post('/', createEvent); 
router.put('/:eventName', updateEvent);
router.delete('/:eventName',deleteEvent)
module.exports = router;
