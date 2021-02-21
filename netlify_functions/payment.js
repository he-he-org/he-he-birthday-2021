const stripe = require("stripe");

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const ROOT_URL = process.env.URL;

const stripeClient = stripe(SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const { amount } = JSON.parse(event.body);
    if (typeof amount !== "number") {
      return {
        statusCode: 200,
        body: "Error: request body should contain JSON with amount parameter",
      };
    }
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation for birthday",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${ROOT_URL}`,
      cancel_url: `${ROOT_URL}`,
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
