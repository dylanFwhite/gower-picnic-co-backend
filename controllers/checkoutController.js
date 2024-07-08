import loadStripe from "stripe";
import Order from "../models/orderModel.js";
import Customer from "../models/customerModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Product from "../models/productModel.js";
import Email from "../utils/email.js";

const stripe = loadStripe(process.env.STRIPE_TOKEN);
const endpointSecret = process.env.STRIPE_WEBHOOK_TOKEN;

const calculateOrderAmount = catchAsync(async (productIds) => {
  const products = await Product.find({ _id: { $in: productIds } });
  if (!products) return new AppError("Could not find products", 400);
  const amount = products
    .map((product) => product.price)
    .reduce((acc, curr) => acc + curr, 0);
  return amount;
});

const createPaymentIntent = catchAsync(async (req, res, next) => {
  const { collectionDate, productIds, note, customer, customerEmail } =
    req.body;
  const amount = await calculateOrderAmount(productIds);

  const order = await Order.create({
    collectionDate,
    products: productIds,
    // NOTE: On DB price is in £ but Stripe has price in pence
    price: amount,
    note,
    customer,
  });
  if (!order) return next(new AppError("Could not create order", 400));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "gbp",
    metadata: {
      orderId: order._id.toString(),
    },
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: customerEmail,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const handlePaymentIntentSucceeded = catchAsync(async (data) => {
  const { customerEmail, orderId } = data;
  // Update order paid status
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { paid: true },
    { new: true }
  );
  // Send confirmation email to both the customer and the Admin
  const customer = await Customer.findOne({ email: customerEmail });
  await new Email(customer).sendConfirmation(customer, order);
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
  const customerEmail = event.data.object.receipt_email;
  const orderId = event.data.object.metadata.orderId;
  switch (event.type) {
    case "payment_intent.succeeded":
      handlePaymentIntentSucceeded({ customerEmail, orderId });
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};

export { createPaymentIntent, webhookHandler };
