export default function(err, req, res, next) {
  if (!err) return next();
  res.status(500);
  return res.json({
    success: false,
    message: err.message || 'Something went wrong.'
  });
};
