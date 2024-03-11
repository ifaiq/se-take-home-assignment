const express = require("express");
const app = express();
require("./config/db");
const orderRoute = require("./routes/orderRoute");

app.use(express.json());
app.use("/api/orders", orderRoute);

app.listen(3005, () => {
  console.log(`Backend server is running on port 3005`);
});
