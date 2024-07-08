import { onRequest } from 'firebase-functions/v2/https';

// import { stripe as stripeClient } from '../index';

export const chargePaymentMethod = onRequest(async (req, res): Promise<any> => {
  // const { paymentMethodId, amount } = req.query;
  // const paymentIntent = await stripeClient.paymentIntents.create({
  //   amount: amount * 100, // Amount in cents
  //   currency: 'usd',
  //   payment_method: paymentMethodId,
  //   confirm: true,
  // });
  // return paymentIntent;
});
