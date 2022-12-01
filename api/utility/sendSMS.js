import axios from 'axios';

// create user registation activation OTP
const sendSMS = async (cell, msg) => {
    try {
        await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=${process.env.SMS_TYPE}&number=${cell}&senderid=${process.env.SMS_SENDER_ID}&message=${msg}`)
    } catch (error) {
        console.log(error);
    }
}

// export default
export default sendSMS; 