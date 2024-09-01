import logger from "../config/Logger";
import emailValidator from "email-validator"
import nodemailer from "nodemailer"


const emailValidation = async (email : string) => {
    try {
        const validEmail = emailValidator.validate(email);
        return validEmail
    } catch (error) {
        logger.error(error);
        throw new Error("Email is not valid")
    }
}

const sendResetOtpEmail = async (email : string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : email,
        subject : "Password Reset Request",
        text : `Your OTP for password reset is ${otp}`
    }

    await transporter.sendMail(mailOptions);
}

export {
    emailValidation,
    sendResetOtpEmail
}