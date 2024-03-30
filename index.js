// const express = require("express");
// const app = express();

// const port = 5000;
// app.get("/", (req, res) => {
//   res.send("Hi there paystack");
// });

// app.listen(port, () => console.log(`server running on port ${port}`));

const https = require("https");
const dotenv = require("dotenv").config();
const paystack_key = process.env.PAYSTACK_LIVE_KEY;

const params = JSON.stringify({
  email: "kamirimichael369@gmail.com",
  amount: "1",
});

const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
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
