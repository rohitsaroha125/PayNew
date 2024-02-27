import express from "express";
import dbConnection from "./utils/dbConnection.js";
import routes from './routes/index.js'
import cors from 'cors'
import "dotenv/config";

const port = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', routes)

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
