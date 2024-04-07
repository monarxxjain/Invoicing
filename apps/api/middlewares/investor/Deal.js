const prisma = require('../../db')
const jwt = require('jsonwebtoken')

const extractInvestorFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const decodedToken = jwt.decode(token)
        const { wolleteAddr } = decodedToken
        if(wolleteAddr) {
            const investor = await prisma.investor.findUnique({ where: { wolleteAddr: wolleteAddr } });
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