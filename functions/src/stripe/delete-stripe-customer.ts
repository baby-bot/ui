import * as auth from 'firebase-functions/v1/auth';
const admin = require('firebase-admin');
import { stripe } from './stripe-config';

// Triggered when a user is deleted
export const deleteStripeCustomer = auth.user().onDelete(async (user) => {
  try {
    const customerDoc = await admin
      .firestore()
      .collection('stripeCustomers')
      .doc(user.uid)
      .get();
    const customerId = customerDoc.data().customerId;

    if (customerId) {
      await stripe.customers.del(customerId);
      await admin
        .firestore()
        .collection('stripeCustomers')
        .doc(user.uid)
        .delete();
      console.log(`Deleted Stripe customer for user ${user.uid}`);
    }
  } catch (error) {
    console.error('Error deleting Stripe customer:', error);
  }
});
