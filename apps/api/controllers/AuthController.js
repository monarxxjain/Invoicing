const prisma = require('../db')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 12

const generateJwtToken = (req, res, role) => {
    const { name, email } = req.body
    const userObj = { name, email, role }
    const expiresIn = process.env.JWT_EXPIRY || '1d';
    const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn })
    return token
}

const addEmployee = async (req, res) => {
    try {
        
        const user = await prisma.users.create({
            data: {
                role: req.body.role
            }
        })

        const userId = user.id

        // Hashing password coming from frontend and then storing it 
        const hashedPassword = await bcrypt.hash(password, saltRounds)
    
        const employee = await prisma.employee.create({
            data: {
                ...req.body,
                password: hashedPassword,
                user: {
                    connect: { id: userId }
                }
            }
        });

        res
          .cookie("ROLE", req.body.role,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("METAMASKID", req.body.metaMaskId,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(201).json({message: "Employee Added Successfully"})
          
    } catch (error) {
        console.log("Error Creating Employee: ", error)

        res.status(401).json({error: "Error Creating Employee"})
    }
}

const loginEmployee = async (req, res) => {
    try {
        if(!req.employee){
            return res.status(404).json({error: "Employee Does not Exist"})
        }
        const { password } = req.body
        const dbPassword = req.employee.password

        // Comparing hashed password and request password as well as PAN Card Number
        const isPasswordCorrect = await bcrypt.compare(password, dbPassword)
        if(isPasswordCorrect) {
            const expiryTime = process.env.JWT_EXPIRY || '1d';
            const token = generateJwtToken(req, res, req.employee.role)
            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("ROLE", req.employee.role,  {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(201)
              .json({message: "Employee Logged in Successfully"})
        }
        else{
            res.status(403).json({error: "Incorrect Password"})
        }
    } catch (error) {
        console.log("Error Logging in Employee: ", error)

        return res.status(404).json({error: "Error Logging in Employee"})
    }
}

const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany()
    return res.status(200).json(users)
}

module.exports = {
    generateJwtToken,
    getAllUsers,
    addEmployee,
    loginEmployee
}