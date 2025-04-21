// const express = require('express');
// const router = express.Router();

// const {
//     createProducer,
//     getProducer,
//     getProducers,
//     updateProducer
// } = require('../controllers/producer.controller');

// router.get('/', getProducers);
// router.get('/:producerEmail', getProducer); 
// router.post('/', createProducer); 
// router.put('/:producerEmail', updateProducer); 
// module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createProducer,
    getProducer,
    getProducers,
    updateProducer
} = require('../controllers/producer.controller');

// הגדרת המסלולים
router.get('/', getProducers); // לקבלת כל המפיקים
router.get('/:producerEmail', getProducer); // לקבלת מפיק לפי אימייל
router.post('/', createProducer); // יצירת מפיק חדש
router.put('/:producerEmail', updateProducer); // עדכון מפיק קיים

module.exports = router;
