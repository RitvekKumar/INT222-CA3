import express from "express";
import mongodb from "./db.js";
import SignupRoutes from "./Routes/CreateUser.js";
import LoginRoutes from "./Routes/Login.js";

const app = express();
const PORT = 3001;
app.use(express.json());

mongodb();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.use("/User", SignupRoutes);
app.use("/User", LoginRoutes);

app.listen(PORT, () => {
  console.log(`Port is listening on http://localhost:${PORT}`);
});