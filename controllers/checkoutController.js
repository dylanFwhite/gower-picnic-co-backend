import st from "stripe";
const stripe = st(process.env.STRIPE_TOKEN);

const createCheckoutSession = async (req, res) => {
  const session = stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price: "price_1PWkepAmuRktGHKRL2vHQHme",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${process.env.SERVER_DOMAIN}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
};

const getSessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
};

export { createCheckoutSession, getSessionStatus };
