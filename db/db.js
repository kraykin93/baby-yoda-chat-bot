const { Client, types } = require('pg');
types.setTypeParser(20, BigInt); // Type Id 20 = BIGINT | BIGSERIAL

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = {
  client,
};
