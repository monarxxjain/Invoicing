import { ethers } from "ethers";
import { ABI } from "./contract_abi";

const NETWORK = "sepolia";
const NFTContractAddress = "0x590948DF40fFE7321556B3ff39765f339681Fc93";
const NFT_ABI = ABI.abi;

export { NFT_ABI, NFTContractAddress };


export const connect = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();
  return signer;
};


export const contract = async (contractAddress, abi, signer) => {
  if (signer === null || signer === undefined) {
    console.log("contract: Sign In First!");
    return;
  }
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};


export const addDeal = async (contract, minAmt, targetAmount, interestRate, startDate, endDate, tokenID) => {

  if (contract === null || contract === undefined) {
    console.log("addDeal: Contract not found!");
    return;
  }

  const tx = await contract.addDeal(minAmt, targetAmount, interestRate, startDate, endDate, tokenID);
  await tx.wait();
  return tx;

}

// 1. Admin: Approve or Reject a deal
export const approveOrRejectDeal = async (contract, dealID, approve) => {

  if (!contract) return console.log("approveOrRejectDeal: Contract not found!");

  const tx = await contract.approveOrRejectDeal(dealID, approve);
  await tx.wait();
  return tx;

};

// 2. Investor: Invest in a deal
export const investInDeal = async (contract, dealID, amountInETH) => {

  if (!contract) return console.log("investInDeal: Contract not found!");

  const tx = await contract.invest(dealID, {
    value: ethers.parseEther(amountInETH),
  });
  await tx.wait();
  return tx;

};

// 3. Admin: Start a deal
export const startDeal = async (contract, dealID) => {

  if (!contract) return console.log("startDeal: Contract not found!");

  const tx = await contract.startDeal(dealID);
  await tx.wait();
  return tx;

};

// 4. Seller: Repay the deal
export const repayDeal = async (contract, dealID, totalDueInETH) => {

  if (!contract) return console.log("repayDeal: Contract not found!");

  const tx = await contract.repay(dealID, {
    value: ethers.parseEther(totalDueInETH),
  });
  await tx.wait();
  return tx;

};

// 5. Investor: Withdraw funds after deal is repaid
export const withdrawFromDeal = async (contract, dealID) => {
  
  if (!contract) return console.log("withdrawFromDeal: Contract not found!");

  const tx = await contract.withdraw(dealID);
  await tx.wait();
  return tx;

};

// 6. Admin: Delete a failed or rejected deal
export const deleteDeal = async (contract, dealID) => {

  if (!contract) return console.log("deleteDeal: Contract not found!");

  const tx = await contract.deleteDeal(dealID);
  await tx.wait();
  return tx;
  
};


