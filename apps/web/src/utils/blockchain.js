import { ethers } from "ethers";
import { CONTRACT_ABI } from "./contract_abi";

const NETWORK = "sepolia";
const CONTRACT_ADDRESS = "0x787E078bDb922737C637984e6ed2529792126e53";
const ABI = CONTRACT_ABI.abi;

const NFT_ABI = [
  "function approve(address to, uint256 tokenId) external",
  "function transferFrom(address from, address to, uint256 tokenId) external",
  "function ownerOf(uint256 tokenId) external view returns (address)"
];


export { ABI, CONTRACT_ADDRESS };


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


export const addDeal = async (
  contract,
  minAmt,
  targetAmount,
  interestRate,
  startDate,
  endDate,
  tokenID,
  nft_address
) => {

  if (!contract) {
    console.error("addDeal: Contract not found!");
    return;
  }

  const minAmtInWei = BigInt(ethers.parseEther(minAmt.toString()));
  const targetAmtInWei = BigInt(ethers.parseEther(targetAmount.toString()));
  const parsedInterestRate = BigInt(interestRate);
  const startTimestamp = BigInt(Math.floor(new Date(startDate).getTime() / 1000));
  const endTimestamp = BigInt(Math.floor(new Date(endDate).getTime() / 1000));
  const parsedTokenID = BigInt(tokenID); 

  console.log({
    minAmtInWei,
    targetAmtInWei,
    parsedInterestRate,
    startTimestamp,
    endTimestamp,
    parsedTokenID
  })

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const nftContract = new ethers.Contract(nft_address, NFT_ABI, signer);
  await nftContract.approve(CONTRACT_ADDRESS, parsedTokenID);


  const tx = await contract.addDeal(
    minAmtInWei,
    targetAmtInWei,
    parsedInterestRate,
    startTimestamp,
    endTimestamp,
    parsedTokenID,
    nft_address
  );

  const receipt = await tx.wait();

  // Find the DealCreated event in the logs
  const event = receipt.logs
    .map(log => {
      try {
        return contract.interface.parseLog(log);
      } catch (e) {
        return null;
      }
    })
    .find(parsed => parsed && parsed.name === "DealCreated");

  if (event) {
    const dealId = event.args.dealId;
    console.log("Deal created with ID:", dealId.toString());
    return dealId;
  } else {
    console.warn("DealCreated event not found.");
    return null;
  }
};

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


