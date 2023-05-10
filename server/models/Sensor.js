const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    metadata: {
        sensor_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    }
});

module.exports = mongoose.model('Sensor', sensorDataSchema);