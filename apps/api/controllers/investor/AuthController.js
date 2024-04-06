const prisma = require('../../db')
const jwt = require("jsonwebtoken");
const registerNewInvestor = async (req, res) => {
    try {

        const userObj = { metaMaskId: req.body.metaMaskId, role: "INVESTOR" }
        const expiresIn = process.env.JWT_EXPIRY || '1d';
        const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn })
        console.log("req ", req.body)
        if(req.investor){
            return res
                    .cookie("ROLE", "INVESTOR",  {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                    .cookie("access_token", token,  {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                    .cookie("METAMASKID", req.body.metaMaskId,  {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                      })
                    .status(200).json({message: "You have Logged In Successfully"})
        }

    
        const investor = await prisma.investor.create({
            data: {
                metaMaskId: req.body.metaMaskId
            }
        });
        console.log("Investor: ", investor)
        res
          .cookie("ROLE", "INVESTOR",  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .cookie("access_token", token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })  
          .cookie("METAMASKID", req.body.metaMaskId,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(201).json(investor)
          
    } catch (error) {
        console.log("Error Creating Investor: ", error)

        res.status(401).json({error: "Error Creating Investor"})
    }
}

module.exports = {
    registerNewInvestor
}