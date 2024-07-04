import loadStripe from "stripe";
import catchAsync from "../utils/catchAsync.js";

const stripe = loadStripe(process.env.STRIPE_TOKEN);
const endpointSecret =
  "whsec_240feddde17c5b5c2f4d277dbdfb2488be72d3617fc4b43a062f3c471a32eb22";

const calculateOrderAmount = (items) => {
  console.log(items);
  return 8400;
};

const createPaymentIntent = catchAsync(async (req, res) => {
  const { items } = req.body;

  // TODO: Create customer if it doesn't exist
  // TODO: Create Order

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const webhookHandler = (req, res) => {
  let event = req.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  // Handle the event
  const data = event.data.object;
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log(`PaymentIntent for ${data.amount} was successful!`);
      // TODO: Trigger emails and update `paid` status
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};

export { createPaymentIntent, webhookHandler };
