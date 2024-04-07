const prisma = require('../../db')

const getInvestor = async (req, res, next) => {
    const { wolleteAddr } = req.body
    if(wolleteAddr) {
        const investor = await prisma.investor.findUnique({ where: { wolleteAddr: wolleteAddr } });
        if(investor){
            req.investor = investor
        }
    }
    next()
}

module.exports = {
    getInvestor
}