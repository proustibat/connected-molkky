const dotenv = require('dotenv');

// Read the .env file
const result = dotenv.config();

if (result.error) {
    throw result.error;
}
const { parsed: envs } = result;
module.exports = envs;