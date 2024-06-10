import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import cors from 'cors';


import stepRoutes from './routes/stepRoutes.js';
import labRoutes from "./routes/labRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();



const app = express();
app.use(cors());
app.use(bodyParser.json());

AWS.config.update({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
app.set("dynamoDB", dynamoDB);




app.use("/api/step",stepRoutes)
app.use("/api/lab",labRoutes)
app.use("/api/file",fileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export { dynamoDB };
