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

    return {signer, contractInstance}
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
