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
            text: 'This is your account activation link',
            html : `
                <body style="display: flex; margin: 30px auto; width: 100%; justify-content: center;"> <table style="width: 800px;"> <tr> <td> <a href="facebook.com" style="display: flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 600; color: #368bf3; font-family: 'Lucida Sans', sans-serif; font-size: 14px; gap: 10px;"><img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="" style="width: 25px; height: 25px; object-fit: cover; margin-right: 10px; margin-top: -2px;"> Action required: Confirm your Facebook account</a> <hr style="border-top: 1px solid #eee; margin-top: 12px;" /> </td> </tr> <tr><td>&nbsp;</td></tr> <tr> <td> <p style="font-size: 12px; font-family: 'Lucida Sans', sans-serif; font-weight: 500;">Hi ${ data.name }</p> <p style="font-size: 12px; font-family: 'Lucida Sans', sans-serif; font-weight: 500; margin-bottom: 20px; display: block; line-height: 17px; margin-top: 20px;">You recently registered for Facebook. To complete your facebook registration, please confirm your account</p> <a href="${ data.link }" style="font-size: 13px; font-family: 'Lucida Sans', sans-serif; font-weight: 600; color: #FFF; display: inline-block; padding: 9px 10px; background-color:#1178F2; border-radius: 6px; text-decoration: none; text-align: center;">Confirm Your Account</a> <p style="font-size: 12px; font-family: 'Lucida Sans', sans-serif; font-weight: 500; margin-bottom: 20px;">You may be asked to enter this confirmation code:</p> <div style="width: 100%;"> <input type="text" value="FB-${ data.code }" style="display: block; margin-bottom: 20px; width: 90px; font-size: 16px; font-weight: 600; text-align: center; padding: 10px 10px; background-color: #ebeff5; border-color: #b5bac0 !important; border-radius: 6px; border: 1px; border-style: solid; outline-style: none; margin: 0 auto;"> </div> <div> <p style="font-size: 10px; font-family: 'Lucida Sans', sans-serif; font-weight: 500; color: gray; line-height: 15px;">Facebook helps you communicate and stay in touch with all of your frieds. Once you've joined Facebook, you'll able to share photos, plan events and more</p> <hr style="border-top: 1px solid #eee; margin-top: 20px; margin-bottom: 20px;" /> <p style="font-size: 10px; font-family: 'Lucida Sans', sans-serif; font-weight: 500; color: gray; line-height: 15px;">This message was send to <a href="#" style="text-decoration: none; color: #368bf3;">salimhasanriad@gmail.com</a> at your request.<br/> Meta Platforms, Inc., Attention: Community Support, 1 Facebook Way, Menlo Park, CA 94025 <br/>To help keep your account secure, please don't forward this email. <a href="#" style="text-decoration: none; color: #368bf3;">Learn More</a></p> </div> </td> </tr> </table> </body>
            `
        });

    } catch (error) {
        console.log(error);
    }

}