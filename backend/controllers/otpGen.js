import OTP from '../models/otpSchema.js';
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";






export const otpGen = async (req, res) => {


const {email} = req.body;
const otp = otpGenerator.generate(6,{upperCase: false, specialChars: false, alphabets: false});

try {
    await OTP.create({email,otp})

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Le otp chak ustad te moj kr",
        text: `ustad tera otp ${otp}`
    });
    res.status(200).send("otp sent successfully");

} catch (error) {
    console.log(error);
    res.status(500).send("error sending otp");
    
}
}