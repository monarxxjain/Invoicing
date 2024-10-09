const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors')
// const prisma = require('./db');
// const bcrypt = require('bcrypt');
const authRouter = require('./routes/authRoutes');
const dealRouter = require('./routes/dealRoutes')
const sellerRouter = require('./routes/sellerRoutes')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())
app.use(cookieParser());

// cors policy
app.use(
    cors({
      origin: "http://localhost:3000", // Your allowed origin
      // origin: 'https://invoicing-web.vercel.app', // Your allowed origin
      credentials: true, // Allow cookies to be sent
    })
);



async function main() {

  const hashedPassword = await bcrypt.hash("7410", 12)
  const employee = await prisma.employee.create({
    data: {
      name: "Monark Jain",
      email: "lcs2022033@gmail.com",
      role: "ADMIN",
      password: hashedPassword
    }
  })
  console.log("Default Admin Added")
}

// main()

app.use('/auth', authRouter)
app.use('/deal', dealRouter)
app.use('/seller', sellerRouter)

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})