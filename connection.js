import mysql, {createConnection} from 'mysql2'

import dotenv from 'dotenv/config'




export const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})


con.connect(function (err){
    if(err) throw  err;
    console.log("Database connected successfully.");
});

