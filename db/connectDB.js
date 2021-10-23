const mongoose = require('mongoose');
const { customError } = require('../error/customeError');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.bgWhite.black(' Database connection established '));
  } catch (error) {
    console.log(
      chalk.red(
        'Database connection failed, Please check authentication details'
      )
    );
  }
};

module.exports = connectDB;
