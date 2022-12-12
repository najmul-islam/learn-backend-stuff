require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middlewre
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listen port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
