import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import morgan from "morgan";

import config from "../env.config.js";
import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";

const app = express();
const port = process.env.PORT || 3000;

// ? Middle - Wares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(helmet());
app.use(morgan("dev"));

// ? Authentication Routes
app.use("/api/auth", authRoutes);
// ? Admin Routes
app.use("/api/admin", adminRoutes);
// ? Shop Routes
app.use("/api/shop", shopRoutes);
// ? Cart Routes
app.use("/api/cart", cartRoutes);
// ? Address Routes
app.use("/api/address", addressRoutes);

// * Testing Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(port, () => {
  connectDB();
  console.log("Server Started...");
});
