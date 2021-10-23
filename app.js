const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./router/router');
const connectDB = require('./db/connectDB');
const errorHandler = require('./middleware/errorHandler');
const chalk = require('chalk');
const notfound = require('./middleware/notfound');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//use morgan for log
app.use(morgan('tiny'));

//use express.json() for json parse from body
app.use(express.json());

//Home Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Blog API, Make Your blog with the API',
  });
});

app.use(express.static('public'));
//set api start default point with version
app.use('/api/v1/blog', router);
app.use(notfound);

app.use(errorHandler);

const startAndConnect = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(chalk.yellow(`Server is running on port ${PORT}`));
  });
};
//server listning
startAndConnect();
