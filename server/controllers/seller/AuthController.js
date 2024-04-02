const prisma = require('../../db')
const jwt = require("jsonwebtoken");
const { generateJwtToken } = require('../AuthController');
const bcrypt = require('bcrypt');
const saltRounds = 12

const addNewSellerRequest = async (req, res) => {
    try {
        
        if(req.seller){
            return res.status(403).json({error: "Seller Already Exists with this EmailID"})
        }

        const user = await prisma.users.create({
            data: {
                role: "SELLER"
            }
        })

        const userId = user.id
        const { password } = req.body

        // Hashing password coming from frontend and then storing it 
        const hashedPassword = await bcrypt.hash(password, saltRounds)
    
        const seller = await prisma.seller.create({
            data: {
                ...req.body,
                isSellerApproved: false,
                password: hashedPassword,
                user: {
                    connect: { id: userId }
                }
            }
        });

        res
          .cookie("ROLE", "SELLER",  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("METAMASKID", req.body.metaMaskId,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("PAN", req.body.panCardNumber,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("EMAIL", req.body.email,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(201).json({message: "Seller Request has been generated successfully"})

    } catch (error) {
        console.log("Error Creating Seller: ", error)

        res.status(401).json({error: "Error Creating Seller"})
    }
}

const approveSellerRequest = async (req, res) => {
    try {

        const seller = await prisma.seller.update({
            where: { metaMaskId: req.body.metaMaskId },
            data: { isSellerApproved: true }
        })

        res.status(200).json({message: "Seller has been Approved Successfully!!"})
    } catch (error) {
        console.log("Error approving Seller: ", error)

        res.status(403).json({error: "Error approving Seller"})
    }
}

const loginSeller = async (req, res) => {
    try {
        if(!req.seller){
            return res.status(404).json({error: "Seller Does not Exist"})
        }
        if(!req.seller.isSellerApproved){
            return res.status(403).json({message: "Your profile is currently under Review"})
        }
        const { password, panCardNumber } = req.body
        const dbPassword = req.seller.password
        const dbPanCardNumber = req.seller.panCardNumber

        // Comparing hashed password and request password as well as PAN Card Number
        const isPasswordCorrect = await bcrypt.compare(password, dbPassword)
        const isPanNumberCorrect = panCardNumber == dbPanCardNumber

        if(isPasswordCorrect && isPanNumberCorrect){
            const expiryTime = process.env.JWT_EXPIRY || '1d';
            const token = generateJwtToken(req, res, "SELLER")

            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("ROLE", req.body.role,  {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(201)
              .json({message: "Logged in Successfully"})
        }

        else 
        res.status(401).json({message: "Wrong Password"})

    } catch (error) {
        console.error('Error logging in Seller:', error);

        res.status(500).json({ error: 'Could not Log In Seller' });
    }
}


module.exports = {
    addNewSellerRequest,
    approveSellerRequest,
    loginSeller
}