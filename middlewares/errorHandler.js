const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  let statusCode = err.statusCode || 500;
  let message = err.message;
  if (err.message === "Invalid token") {
    return res.status(401).json({ message: err.message });
  }
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
