const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const faker = require('faker');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { fake } = require('faker');
faker.seed(123);

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
  random_number = Math.floor(Math.random() * 7);
  switch(random_number) {
    case 0:
      // Buy {product} from {company}
      output = `Buy ${faker.commerce.productName()} from ${faker.company.companyName()}`;
      break;
    case 1:
      // Meet {name}
      output = `Meet ${faker.name.firstName()}`;
      break;
    case 2:
      // Call {company} at {phone_number}
      output = `Call ${faker.company.companyName()} at ${faker.phone.phoneNumberFormat()}`;
      break;
    case 3:
      // Send an email to {name} at {email}
      output = `Send an email to ${faker.name.firstName()} at ${faker.internet.email()}`;
      break;
    case 4:
      // Send {amount} {currency} to {name} at {iban}
      output = `Send ${faker.finance.amount()} ${faker.finance.currencyCode()} to ${faker.name.firstName()} at ${faker.finance.iban()}`;
      break;
    case 5:
      // Buy tickets for a trip to {location} in {month}
      output = `Buy tickets for a trip to ${faker.address.city()} in ${faker.date.month()}`;
      break;
    default:
      // Pick up {first_name} {last_name} from {address}
      output = `Pick up ${faker.name.firstName()} ${faker.name.lastName()} from ${faker.address.streetAddress()}`;
  }
  res.json({
    message: output
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
