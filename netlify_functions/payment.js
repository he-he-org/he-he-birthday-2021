const stripe = require("stripe");

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripeClient = stripe(SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 1,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: `Error: ${e.message}`,
    };
  }
};
