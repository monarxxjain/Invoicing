const prisma = require('../../db')

const { generateJwtToken } = require('../AuthController');
const bcrypt = require('bcrypt');
const saltRounds = 12

const addNewSellerRequest = async (req, res) => {
    try {
        
        if(req.seller){
            return res.status(200).json({error: "Seller Already Exists with this EmailID"})
        }


        const { password } = req.body

        // Hashing password coming from frontend and then storing it 
        const hashedPassword = await bcrypt.hash(password, saltRounds)
    
        const seller = await prisma.seller.create({
            data: {
                ...req.body,
                isSellerApproved: false,
                password: hashedPassword
            }
        });

        res
          .cookie("ROLE", "SELLER",  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("WOLLETEADDR", req.body.wolleteAddr,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("SELLER_ID", seller.id,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("EMAIL", req.body.email,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200).json({message: "Seller Request has been generated successfully"})

    } catch (error) {
        console.log("Error Creating Seller: ", error)

        res.status(401).json({error: "Error Creating Seller"})
    }
}

const approveSellerRequest = async (req, res) => {
    try {

        const seller = await prisma.seller.update({
            where: { wolleteAddr: req.body.wolleteAddr },
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
            return res.status(200).json({error: "Your profile is currently under Review"})
        }
        const { password } = req.body
        const dbPassword = req.seller.password

        // Comparing hashed password and request password
        const isPasswordCorrect = await bcrypt.compare(password, dbPassword)
        if(isPasswordCorrect){
            const userObj = {
              name: req.seller.name,
              email: req.body.email,
              role: "SELLER",
              wolleteAddr: req.body.wolleteAddr
            }
            const token = generateJwtToken(userObj)

            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("ROLE", "SELLER",  {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("WOLLETEADDR", req.body.wolleteAddr,  {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("SELLER_ID", req.seller.id,  {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .cookie("EMAIL", req.body.email,  {
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