require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306     
    });

    console.log('Connected successfully to MySQL!');
    await connection.end();
  } catch (error) {
    console.error('Failed to connect to MySQL:', error);
  }
}

testConnection();
