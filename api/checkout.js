const stripeApi = require("../routes/stripe");

// async function createCheckoutSession(req, res) {
const createCheckoutSession = async (req, res) => {
  console.log("In Route Function");
  const domainUrl = process.env.WEB_APP_URL;

  const { line_items, customer_email } = req.body;
  //check req body has line item and email
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session pasrameters" });
  }
  let session;

  try {
    session = await stripeApi.checkout.sessions.create({
      payment_methods_types: ["card"],
      mode: "payments",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });
    res.status(200).json({ sessionID: session.id });
  } catch (error) {
    xonaile.log(error);
    res
      .status(400)
      .json({ error: "an error occuered unable to create session" });
  }
};

module.exports = createCheckoutSession;
// module.exports = createCheckoutSession;
