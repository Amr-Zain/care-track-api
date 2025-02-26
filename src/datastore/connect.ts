import dotenv from 'dotenv';
import {  Pool } from 'mysql2/promise';
import mysql from 'mysql2/promise';
import path from 'path';


dotenv.config({ path:path.join(__dirname, '../../.env')});


let pool :Pool;

async function createPool(){
try {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        });
    return pool;
  } catch (error) {
    console.error('Error creating database pool:', error);
    throw error;
  }
}

export { createPool, pool };

