const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const dbConnection = require("./config/database");
const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/authRoute");
const brandRoute = require("./routes/brandRoute");
const deepSanitize = require("./middlewares/deepSanitizeMiddleware");

// Connect to the database
dbConnection();

// Load environment variables from config.env file
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 3001;

const app = express();

// Middlewares

app.use(helmet());
/**
 * > npm i helmet
 * Middleware: helmet
 * Purpose: Enhances security by setting appropriate HTTP headers.
 * Features:
 * - Prevents common vulnerabilities like XSS, clickjacking, and MIME sniffing.
 * Example:
 * - Adds the `X-Content-Type-Options: nosniff` header to prevent browsers from interpreting files as a different MIME type.
 * Usage:
 * - Automatically secures your API with default settings.
 */

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
/**
 * Middleware: morgan
 * Purpose: Logs HTTP requests for debugging and monitoring purposes.
 * Modes:
 * - "dev": Provides concise colored logs for development.
 * - "combined": Detailed logs for production, including timestamps and response statuses.
 * Example:
 * - Logs: "GET /home 200 5.432 ms - 13"
 */

app.use(express.json({ limit: "10kb" }));
/**
 * Middleware: express.json()
 * Purpose: Parses incoming JSON payloads in requests.
 * Features:
 * - Restricts payload size to 10kb to prevent Denial of Service (DoS) attacks.
 * Example:
 * - Incoming request: `{ "name": "John" }`
 * - Accessible in code: `req.body.name === "John"`
 */

app.use(express.urlencoded({ extended: true }));
/**
 * Middleware: express.urlencoded()
 * Purpose: Parses incoming URL-encoded payloads, such as form submissions.
 * Features:
 * - Handles data like `name=John&age=30`.
 * - With `extended: false`, only supports simple objects, not nested ones.
 * Example:
 * - Incoming form: `<form><input name="name" value="John"></form>`
 * - Accessible in code: `req.body.name === "John"`
 */

app.use(cookieParser());
/**
 * > npm i cookie-parser
 * Middleware: cookieParser
 * Purpose: Parses cookies from incoming requests.
 * Use Case:
 * - Essential for authentication and session management.
 * Example:
 * - Incoming header: `Cookie: userId=12345`
 * - Accessible in code: `req.cookies.userId === "12345"`
 */

// CORS configuration
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * > npm i cors
 * Middleware: cors
 * Purpose: Enables Cross-Origin Resource Sharing (CORS).
 * Use Case:
 * - Allows your API to handle requests from other domains securely.
 * Options:
 * - `credentials: true`: Supports cookies and authentication headers across domains.
 * - `origin: true`: Dynamically allows all origins.
 * Example:
 * - Frontend hosted on `http://example.com` can access API on `http://api.example.com`.
 */

app.use((req, res, next) => {
  req.body = deepSanitize(req.body);
  req.query = deepSanitize(req.query);
  req.params = deepSanitize(req.params);
  next();
});

// Mount Routes
app.use("/api/auth", authRoute);
app.use("/api/brands", brandRoute);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  const error = new ApiError(
    `Can't find ${req.originalUrl} on this server!`,
    400
  );
  next(error);
});

// Global Error handling middleware
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Handle unhandled promise (asynchronous) rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  // Close the server and exit the process
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
