const prisma = require('../../db')

const getSeller = async (req, res, next) => {
    const { wolleteAddr } = req.body
    console.log("wolleteAddr: ", wolleteAddr)
    if(wolleteAddr) {
        const seller = await prisma.seller.findUnique({ where: { wolleteAddr: wolleteAddr } });
        if(seller){
            req.seller = seller
        }
    }
    next()
}

module.exports = {
    getSeller
}