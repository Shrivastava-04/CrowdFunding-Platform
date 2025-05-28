import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./route/user.route.js";
import campaignRoute from "./route/campaign.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error: ", error);
}

app.use("/user", userRoute);
app.use("/campaign", campaignRoute);

app.get("/", (req, res) => {
  res.send("It's Working!");
});

app.listen(PORT || 4500, () => {
  console.log("Server is running on Port", PORT);
});
