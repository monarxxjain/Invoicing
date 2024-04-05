const prisma = require('../../db')

const registerNewInvestor = async (req, res) => {
    try {
        
        if(req.investor){
            return res
                    .cookie("ROLE", "INVESTOR",  {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                    .status(200).json({message: "You have Logged In Successfully"})
        }

    
        const investor = await prisma.investor.create({
            data: {
                ...req.body
            }
        });

        res
          .cookie("ROLE", "INVESTOR",  {
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