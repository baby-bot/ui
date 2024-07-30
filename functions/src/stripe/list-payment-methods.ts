import { getFirestore } from 'firebase-admin/firestore';

import { stripe as stripeClient } from './stripe-config';
import { onCall } from 'firebase-functions/v2/https';

const db = getFirestore();
const stripeCustomers = db.collection('stripeCustomers');

export const listUserPaymentMethods = onCall(async (context) => {
  // await stripeClient.customers.
  const uid = context.auth.uid;
  const stripeCustomerRef = stripeCustomers.doc(uid);
  const stripeCustomerDoc = (await stripeCustomerRef.get()) as any; // can I use types instead?

  if (!stripeCustomerDoc.exists) {
    return { error: 'Stripe customer not found' };
  }
  const stripeCustomerId = stripeCustomerDoc.data().customerId;

  const paymentMethods = await stripeClient.paymentMethods.list({
    customer: stripeCustomerId,
  });
  return { paymentMethods };
});
