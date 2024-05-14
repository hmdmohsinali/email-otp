import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import genOtpRoute from './routes/genOtpRoute.js';

const PORT = process.env.PORT || 8000;
dotenv.config();
const app = express();
app.use(express.json())

app.use('/', genOtpRoute)

app.get('/', (req, res) => {
    res.send('Server is running home')

})



app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`);
})   


// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const otpGenerator = require('otp-generator');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const app = express();

// const dotenv = dotenv.config();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cors());
// // MongoDB connection
// mongoose.connect('mongodb+srv://<username>:<password>@cluster0.d6t5od6.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // Define schema and model for OTP
// const otpSchema = new mongoose.Schema({
//     email: String,
//     otp: String,
//     createdAt: { type: Date, expires: '5m', default: Date.now }
// });

// const OTP = mongoose.model('OTP', otpSchema);

// // Generate OTP and send email
// app.post('/generate-otp', async (req, res) => {
//     const { email } = req.body;

//     const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//     try {
//         await OTP.create({ email, otp });

//         // Send OTP via email (replace with your email sending logic)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'your-mail@gmail.com',
//                 pass: 'your-app-password'
//             }
//         });

//         await transporter.sendMail({
//             from: 'your-mail@gmail.com',
//             to: email,
//             subject: 'OTP Verification',
//             text: `Your OTP for verification is: ${otp}`
//         });

//         res.status(200).send('OTP sent successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error sending OTP');
//     }
// });

// // Verify OTP
// app.post('/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         const otpRecord = await OTP.findOne({ email, otp }).exec();

//         if (otpRecord) {
//             res.status(200).send('OTP verified successfully');
//         } else {
//             res.status(400).send('Invalid OTP');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error verifying OTP');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
