import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { dotenvConfig, helmetConfig, morganConfig } from "../config.js";

dotenvConfig();
import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import featureRoutes from "./routes/feature.routes.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

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

app.use(helmetConfig());
// * app.use(morganConfig());

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
// ? Payment Routes
app.use("/api/order", orderRoutes);
// ? Review Routes
app.use("/api/review", reviewRoutes);
// ? Feature Routes
app.use("/api/feature", featureRoutes);

// ! Frontend React Application
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  console.log(path.join(__dirname, "/Frontend/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log("Server Started...");
});
