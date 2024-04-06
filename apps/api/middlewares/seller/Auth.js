const prisma = require('../../db')

const getSeller = async (req, res, next) => {
    const { metaMaskId } = req.body
    if(metaMaskId) {
        const seller = await prisma.seller.findUnique({ where: { metaMaskId: metaMaskId } });
        if(seller){
            req.seller = seller
        }
    }
    next()
}

module.exports = {
    getSeller
}