const prisma = require('../../db')

const getInvestor = async (req, res, next) => {
    const { metaMaskId } = req.body
    if(metaMaskId) {
        const investor = await prisma.investor.findUnique({ where: { metaMaskId: metaMaskId } });
        if(investor){
            req.investor = investor
        }
    }
    next()
}

module.exports = {
    getInvestor
}