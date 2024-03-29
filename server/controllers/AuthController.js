const prisma = require('../db')
const UserModel = require('../models/UserModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const saltRounds = 12

const registerNewUser = async (req, res) => {
    try {
        // If user Exists then returs the response accordingly
        if(req.userExists){
            return res.status(403).json({error: "User Already Exists with this EmailID"})
        }

        const { name, email, password } = req.body

        // Hashing password coming from frontend and then storing it 
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = await prisma.users.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);

        res.status(500).json({ error: 'Could not create user' });
    }
}

const loginUser = async (req, res) => {
    try {
        if(!req.userExists){
            return res.status(404).json({error: "User Does not Exist"})
        }
        const { email, password } = req.body
        const dbPassword = req.user.password

        // Comparing hashed password and request password
        const isPasswordCorrect = await bcrypt.compare(password, dbPassword)

        if(isPasswordCorrect){
            const token = generateJwtToken(req, res)
            console.log(token)

            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(201)
              .json({message: "Logged in Successfully"})
        }

        else 
        res.status(401).json({message: "Wrong Password"})

    } catch (error) {
        console.error('Error logging in user:', error);

        res.status(500).json({ error: 'Could not Log In User' });
    }
}

const generateJwtToken = (req, res) => {
    const { name, email } = req.body
    const userObj = { name, email }
    const token = jwt.sign(userObj, process.env.JWT_SECRET)
    return token
}

const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany()
    return res.status(200).json(users)
}

module.exports = {
    registerNewUser,
    loginUser,
    generateJwtToken,
    getAllUsers
}