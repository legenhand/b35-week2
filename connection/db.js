const { Pool } = require('pg');

const dbPool = new Pool({
    database: 'personalweb',
    port: '5432',
    user: 'postgres',
    password: 'root',
});

module.exports = dbPool;
