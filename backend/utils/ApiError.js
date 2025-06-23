// @description: Custom error class for API errors

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Indicates if the error is operational or programming error
  }
}

module.exports = ApiError;
