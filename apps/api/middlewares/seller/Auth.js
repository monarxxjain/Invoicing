const prisma = require('../../db')

const getSeller = async (req, res, next) => {
    const { metaMaskId } = req.body
    const seller = await prisma.seller.findUnique({ where: { metaMaskId } });
    if(seller){
        req.seller = seller
    }
    next()
}

module.exports = {
    getSeller
}