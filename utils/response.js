exports.success = (res, msg, data) =>
  res.status(200).json({
    msg,
    data,
  });

exports.error = (res, msg) =>
  res.status(400).json({
    msg,
  });
