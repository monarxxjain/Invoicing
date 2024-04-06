const prisma = require('../../db')
const jwt = require('jsonwebtoken')

const extractInvestorFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const decodedToken = jwt.decode(token)
        const { metaMaskId } = decodedToken
        if(metaMaskId) {
            const investor = await prisma.investor.findUnique({ where: { metaMaskId: metaMaskId } });
            if(investor){
                req.investor = investor
            }
        }
        next()
    } catch (error) {
        
    }
}

module.exports =  {
    extractInvestorFromToken
}