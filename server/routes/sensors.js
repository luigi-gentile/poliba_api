const express = require('express');
const Sensor = require('../models/Sensor');

const router = express.Router();

// get data
router.get('/data', async (req, res) => {
    try {
        const sensors = await Sensor.find().sort({ timestamp: -1 }).select('-_id');
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// dati degli ultimi 30 giorni
router.get('/last', async (req, res) => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const sensors = await Sensor.find({ timestamp: { $gt: thirtyDaysAgo } })
            .sort({ timestamp: -1 })
            .select('-_id');
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
