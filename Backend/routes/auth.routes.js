import express from "express";
import {
  signUp,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);
router.post("/logout", logout);

router.get("/check-auth", verifyJWT, checkAuth);

export default router;
