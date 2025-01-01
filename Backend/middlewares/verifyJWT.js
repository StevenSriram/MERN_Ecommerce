import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized - Invalid or expired token",
      });
  }
};
