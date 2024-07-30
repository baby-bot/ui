import * as auth from 'firebase-functions/v1/auth';
import { FieldValue } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import { stripe } from './stripe-config';

export const createStripeCustomer = auth.user().onCreate(async (user) => {
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        firebaseUID: user.uid,
      },
    });

    await admin.firestore().collection('stripeCustomers').doc(user.uid).set({
      customerId: customer.id,
      email: user.email,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log(`Created Stripe customer for user ${user.uid}`);
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
  }
});
