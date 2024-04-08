const prisma = require('../db')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 12

const generateJwtToken = (userObj) => {
    const expiresIn = process.env.JWT_EXPIRY || '1d';
    const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn })
    return token
}

const addEmployee = async (req, res) => {
    try {
        


        // Hashing password coming from frontend and then storing it 
        const hashedPassword = await bcrypt.hash(password, saltRounds)
    
        const employee = await prisma.employee.create({
            data: {
                ...req.body,
                password: hashedPassword
            }
        });

        res
          .cookie("ROLE", req.body.role,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("WOLLETEADDR", req.body.wolleteAddr,  {
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

            const userObj = {
                name: req.body.name,
                email: req.body.email,
                role: req.employee.rol,
            }
            const token = generateJwtToken(userObj)
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

const logout = (req, res) => {
    res
    .cookie("access_token", "", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200).json({message: "You have logged Out Successfully"})
}

module.exports = {
    generateJwtToken,
    addEmployee,
    loginEmployee,
    logout
}