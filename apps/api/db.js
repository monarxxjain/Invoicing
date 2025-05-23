const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log("Prisma Client Connected")

module.exports = prisma

//supabase 


// postgresSQL,