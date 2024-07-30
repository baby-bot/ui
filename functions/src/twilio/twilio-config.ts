import * as functions from 'firebase-functions';
import twilio from 'twilio';

const accountSid = functions.config()['twilio'].account_sid;
const apiKey = functions.config()['twilio'].api_key;
const apiSecret = functions.config()['twilio'].api_secret;

export const twilioClient = twilio(apiKey, apiSecret, { accountSid });
