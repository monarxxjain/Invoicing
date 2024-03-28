const express = require('express')
// const client = require('./db')
const cors = require('cors')
const authRouter = require('./routes/authRoutes')
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())

// cors policy
app.use(
    cors({
      origin: "*", // Your allowed origin
      credentials: true, // Allow cookies to be sent
    })
);


app.use('/auth', authRouter)



app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})