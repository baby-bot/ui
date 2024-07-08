import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import { twilioClient } from './twilio-config';

export const purchaseNumber = onRequest(async (req, res): Promise<any> => {
  const { number } = req.query;

  const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
    smsApplicationSid: '',
    voiceApplicationSid: '',
    phoneNumber: number?.toString(),
  });

  console.log('Purchased number:', purchasedNumber);

  // purchasedNumber.

  try {
  } catch (error) {
    console.error('Error purchasing number:', error);
    res.status(500).send('Internal Server Error');
  }
});
