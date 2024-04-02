const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors')
// const prisma = require('./db');
// const bcrypt = require('bcrypt');
const authRouter = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())
app.use(cookieParser());

// cors policy
app.use(
    cors({
      origin: "*", // Your allowed origin
      credentials: true, // Allow cookies to be sent
    })
);



async function main() {

  const user = await prisma.users.create({
    data: {
        role: "ADMIN"
    }
  })

  const userId = user.id
  const hashedPassword = await bcrypt.hash("7410", 12)
  const employee = await prisma.employee.create({
    data: {
      name: "Monark Jain",
      email: "lcs2022033@gmail.com",
      role: "ADMIN",
      password: hashedPassword,
      user: {
        connect: { id: userId }
      }
    }
  })
}

// main()

app.use('/auth', authRouter)
app.use('/deal', dealRoutes)


app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})