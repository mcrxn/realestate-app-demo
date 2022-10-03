import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose, { mongo } from "mongoose";
import { globalRouter } from "./const/router.const.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB_NAME } =
  process.env;

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.e8o9hsy.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(globalRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`mongodb conected`);
    app.listen(PORT, HOST, () => {
      console.log(`server is listening at port ${PORT}`);
    });
  }
});
