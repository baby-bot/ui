import * as functions from 'firebase-functions';
import Stripe from 'stripe';

const stripeKey = functions.config()['stripe'].secret;
export const stripe = new Stripe(stripeKey);
