// const { Client } = require('pg')

// const client = new Client({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     user: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || '7410',
//     database: process.env.DB_NAME || 'invoice'
// })

// // database connection
// client.connect((err) => {
//     if(err){
//         console.log('Connection Error', err.message)
//     }
//     else{
//         console.log('Connected')
//     }
// })

// module.exports = client



const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma