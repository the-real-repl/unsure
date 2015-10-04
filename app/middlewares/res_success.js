export default function(req, res, next) {
  res.success = function(obj) {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON();
    }
    return res.json({
      success: true,
      data: obj
    });
  };
  next();
}
