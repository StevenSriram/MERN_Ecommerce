import dotenv from "dotenv";
import path from "path";

import helmet from "helmet";
import morgan from "morgan";

// ! Configuring dotenv with path
const dotenvConfig = () => {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
  });
};

// ! Configuring helmet
const helmetConfig = () => {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources only from the same domain
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow scripts from the same domain and inline scripts
      imgSrc: [
        "'self'", // Allow images from the same domain
        "https://res.cloudinary.com", // Allow images from Cloudinary
      ],
      connectSrc: ["'self'"], // Allow API connections only from the same domain
      objectSrc: ["'none'"], // Disable plugins like Flash
      upgradeInsecureRequests: [], // Automatically upgrade HTTP requests to HTTPS
    },
  });
};

// ! Configuring morgan
const morganConfig = () => {
  return morgan("dev");
};

export { dotenvConfig, helmetConfig, morganConfig };
