import * as admin from 'firebase-admin';
import { log } from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
// TODO: change this to by more dynamic
const useEmulator = true;
if (useEmulator) {
  process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';
}
admin.initializeApp({});

export { listNumbers, purchaseNumber } from './twilio';

export {
  chargePaymentMethod,
  createPaymentMethod,
  createStripeCustomer,
  deleteStripeCustomer,
} from './stripe';

export const testing123 = onRequest((req, res) => {
  log('ahhhhhhhhh');
  res.send('hello world').end();
});
