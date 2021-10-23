const notfound = (req, res, next) => {
  return res.status(404).json({ msg: 'Route Not found' });
};

module.exports = notfound;
