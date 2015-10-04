export default function(req, res, next) {
  res.error = function(message, code = 400) {
    return res.status(code).json({
      success: false,
      message: message
    });
  };
  next();
}
