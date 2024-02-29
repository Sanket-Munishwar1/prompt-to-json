import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./Routes/router.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("APP IS RUNNING LIKE BOLT");
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});