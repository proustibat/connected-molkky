const dotenv = require('dotenv');

// Read the .env file
let config;

if (!process.env.CI) {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
  const { parsed } = result;
  config = parsed;
} else {
  config = {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT,
    BS_PORT: process.env.BS_PORT,
  };
}
module.exports = config;
