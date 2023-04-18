const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { user_name, wallet_name, email, password } = req.body;
  const admin_id = process.env.ADMIN_ID;
  const api_key = process.env.API_KEY;

  const url = "https://pay.zapit.live/usermanager/api/v1/users";

  const data = {
    admin_id,
    user_name,
    wallet_name,
    email,
    password,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Api-Key": api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  res.status(response.status).json(result);
};
