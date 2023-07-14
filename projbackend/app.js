require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBroutes");
// const stripeRoutes = require("./routes/stripepayment");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middle ware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes); //Prefixing everything with slash api
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

// app.use("/api", stripeRoutes);
// app.get("/",(req,res)=>{
//     res.send("You are on 1st page")
// })
//MY PORT

const port = process.env.PORT || 8000;
//Starting a Server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
