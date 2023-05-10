const express = require('express');
const Sensor = require('../models/Sensor');

const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        const sensors = await Sensor.find().sort({ timestamp: -1 }).select('-_id');
        res.send(sensors);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
