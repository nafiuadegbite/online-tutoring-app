const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);

mongoose
  .connect(
    "mongodb+srv://dbAdmin:rkxM7GhXJQquvvL@cluster0-iztcp.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));
