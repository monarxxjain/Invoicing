import { ethers } from "ethers";
import {
  NFTContractAddress,
  NFT_ABI,
  addDeal,
  addInvestment,
  connect,
  contract,
  mintNFT,
  transferAllBackPerDeal,
  transferNFT,
  revertInvestment,
  dealStartApproval,
} from "./blockchain/blockchain";

const CONTRACT_ADDRESS = NFTContractAddress;
const ABI = NFT_ABI;

export const initWallet = async () => {
    let signer = await connect();
    let contractInstance = await contract(CONTRACT_ADDRESS, ABI, signer);
    let walletAddress = await signer.getAddress();
    console.log("Wallet Initialized successfully!")
    return {signer, walletAddress, contractInstance}
}

export const signMessage = async (signer, message) => {
  if (signer === null || signer === undefined) {
    console.log("signMessage: Sign In First!");
    return;
  }
  return await signer.signMessage(message);
}

export const verifySignedMessage = async (message, signedMessage, walletAddress) => {
  return ((await ethers.verifyMessage(message, signedMessage)) === walletAddress);
}

export const mintAndTransferToSystem = async (
  contract,
  recipient,
  tokenURI
) => {
  let nft = await mintNFT(contract, recipient, tokenURI);
  await transferNFT(contract, recipient, true, nft.tokenID);
  return nft;
};

export const systemApprovesDeal = async (contract, approve, params) => {
  if (approve) {
    return await addDeal(
      contract,
      params.dealID,
      params.minAmt,
      params.targetAmt,
      params.floatingEndTimestamp,
      params.expirationTimestamp,
      params.tokenID,
      params.interestRate,
      params.companyAddress
    );
  } else {
    return await transferNFT(
      contract,
      params.actorAddress,
      false,
      params.tokenID
    );
  }
};

export {
  addInvestment,
  transferAllBackPerDeal,
  revertInvestment,
  dealStartApproval,
};
