import express from "express";
import dbConnection from "./utils/dbConnection.js";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", routes);

// 404 route
app.all("*", function (req, res) {
  res.status(404).json({
    status: "fail",
    message: "No such route present",
  });
});

app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
});

// Database connection handler
dbConnection()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error is ", err);
  });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
