import { onRequest } from 'firebase-functions/v2/https';

import { stripe as stripeClient } from './stripe-config';

export const createPaymentMethod = onRequest(async (req, res): Promise<any> => {
  // await stripeClient.customers.

  const customer = await stripeClient.customers.create();
  const setupIntent = await stripeClient.setupIntents.create({
    customer: customer.id,
  });
  return setupIntent.client_secret;
});
