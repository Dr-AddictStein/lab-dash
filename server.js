import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import dotenv from "dotenv";


import stepRoutes from './routes/stepRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

AWS.config.update({
  region: process.env.AWS_REGION, // e.g., 'us-west-2'
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
app.set("dynamoDB", dynamoDB);


app.use("/api/step",stepRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});

export { dynamoDB };
