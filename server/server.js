const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const verifyToken = require('./middlewares/verifyToken.js')

const sensorRoutes = require('./routes/sensors.js')
const authRoutes = require('./routes/auth.js')

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sensors', verifyToken, sensorRoutes);

mongoose.connect("mongodb+srv://admin:admin@ponagreed.93ctre2.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connection successful");
        app.listen(port, () => console.log(`App listening on port: ${port}`));
    })
    .catch(err => console.log(err));