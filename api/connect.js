import mysql from "mysql"
import dotenv from 'dotenv';

dotenv.config();
// Access environment variables
const host = process.env.HOST;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

export const db = mysql.createConnection({
    host:host,
    user:dbuser,
    password:dbpassword,
    database:database
})