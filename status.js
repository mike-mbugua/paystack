const https = require("https");
const dotenv = require("dotenv").config();
const paystack_key = process.env.PAYSTACK_LIVE_KEY;

const params = JSON.stringify({
  amount: 200,
  email: "kamirimichael369@email.com",
  currency: "KES",
  mobile_money: {
    phone: "+254705197981",
    provider: "mpesa",
  },
});

const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/charge",
  method: "POST",
  headers: {
    Authorization: `Bearer ${paystack_key}`,
    "Content-Type": "application/json",
  },
};

const req = https
  .request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

req.write(params);
req.end();
