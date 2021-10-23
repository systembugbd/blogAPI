class CustomeErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customError = (message, statusCode) => {
  return new CustomeErrorAPI(message, statusCode);
};

module.exports = {
  customError,
  CustomeErrorAPI,
};
