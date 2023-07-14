const PROCESS = require('dotenv').config()
const twilio = {};

const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN
const verifySid = process.env.VERIFYSID

const client = require("twilio")(accountSid, authToken);

twilio.sendOTP = async function(phoneNumber, channel) {
    try {
        const data = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: channel })
        return true;
    } catch (err) {
        throw new Error(`Error while sending otp: ${err}`);
    } 
};


twilio.verifyOTP = async function(phoneNumber, otpCode) {
    try {
        const data = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otpCode });
        if(data.status === 'approved') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw new Error(`Error while verifying otp: ${err}`);
    }
}

module.exports = twilio;
