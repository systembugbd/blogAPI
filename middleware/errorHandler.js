const { CustomeErrorAPI } = require('../error/customeError');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomeErrorAPI) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: err.message });
  }

  return res.status(500).json({ msg: err.message });
};

module.exports = errorHandler;
