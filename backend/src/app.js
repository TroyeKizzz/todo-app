const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const faker = require('faker');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.get('/task/random', (req, res) => {
  output = "";
  //switch(Math.floor(Math.random() * 10)) {
  switch(0) {
    case 0:
      // Buy {product} from {company_name}
      const product = faker.commerce.productName();
      const company_name = faker.commerce.companyName();
      output = `Buy ${product} from ${company_name}`;
      break;
    case 1:
      // Meet {name}
      break;
    default:
      // code block
  }
  res.json({
    message: output
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
