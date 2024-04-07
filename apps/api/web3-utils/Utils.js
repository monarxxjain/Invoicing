const ethers = require('ethers')

const verifySignedMessage = async (message, signedMessage, walletAddress) => {
    return ((await ethers.verifyMessage(message, signedMessage)) === walletAddress);
}

module.exports = {
    verifySignedMessage
}