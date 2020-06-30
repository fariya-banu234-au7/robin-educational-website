import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASSWORD } from '../config/mailer.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD
    }   
});

export const sendEmail = (from, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({ from, subject, to, html }, (err, info) => {
            if (err)
                reject(err);
            resolve(info);
        });
    });
};