import nodemailer from 'nodemailer';

/**
 * Send Account Activation 
 */
export const sendActivationLink = (to, data) => {

    // create transporter
    let transport = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS,
        }
    });

    try {
        
        // send activation link
        transport.sendMail({
            from : `Facebook Pro <${process.env.MAIL_ID}>`,
            subject : 'Account Activation',
            to: to,
            text: 'This is your account activation link'
        });

    } catch (error) {
        console.log(error);
    }

}