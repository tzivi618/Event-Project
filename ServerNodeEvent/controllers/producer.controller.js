// const express = require('express');
// const app = express();
// app.use(express.json());
// const ModuleProducer = require('../modules/producer.module');

// const createProducer = async (req, res) => {
//     try {
//         const newProducer = getProducerFromBody(req);
//         if (!newProducer.producerName || !newProducer.producerEmail) {
//             return res.status(400).send('Name and Email are required.');
//         }
//         const producerFind = await ModuleProducer.findOne({ producerEmail: newProducer.producerEmail });
//         if (producerFind) {
//             return res.status(400).send('Email already exists.');
//         }
//         const producer = new ModuleProducer(newProducer);
//         await producer.save();
//         res.status(201).send(producer); // שינוי ל-201 כי זה יוצר משאב חדש
//         console.log('Producer added successfully:', newProducer);
//     } catch (error) {
//         console.error('Error adding producer:', error);
//         res.status(500).send('Internal server error'); // שינוי לקוד שגיאה 500
//     }
// };

// const getProducer = async (req, res) => {
//     try {
//         const producerFind = await ModuleProducer.findOne({ producerEmail: req.params.producerEmail });
//         if (!producerFind) {
//             return res.status(404).send('Producer not found');
//         }
//         res.status(200).send(producerFind);
//     } catch (error) {
//         console.error('Error fetching producer:', error);
//         res.status(500).send('Internal server error');
//     }
// };

// const getProducers = async (req, res) => {
//     try {
//         const producerFind = await ModuleProducer.find();
//         res.status(200).send(producerFind);
//     } catch (error) {
//         console.error('Error fetching producers:', error);
//         res.status(500).send('Internal server error');
//     }
// };

// const updateProducer = async (req, res) => {
//     try {
//         const newProducer = getProducerFromBody(req);
//         if (!newProducer.producerName || !newProducer.producerEmail) {
//             return res.status(400).send('Name and Email are required.');
//         }
//         const producer = await ModuleProducer.findOneAndUpdate({ producerEmail: newProducer.producerEmail }, newProducer, { new: true });
//         if (!producer) {
//             return res.status(404).send('Producer not found');
//         }
//         res.status(200).send(producer);
//     } catch (error) {
//         console.error('Error updating producer:', error);
//         res.status(500).send('Internal server error');
//     }
// };

// const getProducerFromBody = (req) => {
//     const { producerName, producerPhone, producerEmail, producerDescription } = req.body;
//     return {
//         producerName,
//         producerPhone,
//         producerEmail,
//         producerDescription,
//     };
// }

// module.exports = {
//     createProducer,
//     getProducer,
//     getProducers,
//     updateProducer
// };
const ModuleProducer = require('../modules/producer.module');

// פונקציה ליצירת מפיק חדש
const createProducer = async (req, res) => {
    try {
        const newProducer = getProducerFromBody(req);
        if (!newProducer.producerName || !newProducer.producerEmail) {
            return res.status(400).send('Name and Email are required.');
        }
        const producerFind = await ModuleProducer.findOne({ producerEmail: newProducer.producerEmail });
        if (producerFind) {
            return res.status(400).send('Email already exists.');
        }
        const producer = new ModuleProducer(newProducer);
        await producer.save();
        res.send(producer);
        console.log('Producer added successfully:', newProducer);
    } catch (error) {
        console.error('Error adding producer:', error);
        res.status(500).send('Internal server error');
    }
};

// פונקציה לקבלת מפיק לפי אימייל
const getProducer = async (req, res) => {
    try {
        const producerFind = await ModuleProducer.findOne({ producerEmail: req.params.producerEmail });
        if (!producerFind) {
            return res.status(404).send('Producer not found');
        }
        res.status(200).send(producerFind);
    } catch (error) {
        console.error('Error fetching producer:', error);
        res.status(500).send('Internal server error');
    }
};

// פונקציה לקבלת כל המפיקים
const getProducers = async (req, res) => {
    try {
        const producers = await ModuleProducer.find();
        res.status(200).send(producers);
    } catch (error) {
        console.error('Error fetching producers:', error);
        res.status(500).send('Internal server error');
    }
};

// פונקציה לעדכון מפיק קיים
const updateProducer = async (req, res) => {
    try {
        const newProducer = getProducerFromBody(req);
        if (!newProducer.producerName || !newProducer.producerEmail) {
            return res.status(400).send('Name and Email are required.');
        }
        const producer = await ModuleProducer.findOneAndUpdate(
            { producerEmail: newProducer.producerEmail },
            newProducer,
            { new: true }
        );
        if (!producer) {
            return res.status(404).send('Producer not found');
        }
        res.status(200).send(producer);
    } catch (error) {
        console.error('Error updating producer:', error);
        res.status(500).send('Internal server error');
    }
};

// פונקציה לעיבוד נתוני המפיק מהבקשה
const getProducerFromBody = (req) => {
    const { producerName, producerPhone, producerEmail, producerDescription } = req.body;
    return {
        producerName,
        producerPhone,
        producerEmail,
        producerDescription,
    };
}

module.exports = {
    createProducer,
    getProducer,
    getProducers,
    updateProducer
};
