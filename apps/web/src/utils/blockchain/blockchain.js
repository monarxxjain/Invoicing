import { ethers } from "ethers";
import { MyNFT } from "./MyNFT";

const NETWORK = "sepolia";
const NFTContractAddress = "0x6Dc9e4f90818D09f6de6c2955bE2b2b49CEA76b2";
const NFT_ABI = MyNFT.abi;

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

/**
 * Represents a book.
 * @param {string} receiverAddress - The address of receiver.
 */
export const transferETH = async (signer, receiverAddress, amount) => {
  if (signer === null || signer === undefined) {
    console.log("transferETH: Sign In First!");
    return;
  }
  try {
    const tx = await signer.sendTransaction({
      to: receiverAddress,
      value: ethers.parseEther(amount),
    });

    console.log(`https://${NETWORK}.etherscan.io/tx/${tx.hash}`);

    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
    return receipt;
  } catch {
    return;
  }
};

export const contract = (contractAddress, abi, signer) => {
  if (signer === null || signer === undefined) {
    console.log("contract: Sign In First!");
    return;
  }
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

// Mint NFT function
// recipient : wallet address of metamask of company
export async function mintNFT(contract, recipient, tokenURI) {
  if (contract === null || contract === undefined) {
    console.log("mintNFT: Make instance of Contract First");
    return;
  }
  try {
    const tx = await contract.mintNFT(recipient, tokenURI);
    console.log(JSON.stringify(tx));

    let receipt = await tx.wait();

    console.log(
      "NFT minted successfully. Last minted token ID:",
      JSON.stringify(receipt)
    );

    let tokenID = parseInt(receipt.logs[0].topics[3], 16);
    return {
      hash: receipt.hash,
      tokenID: tokenID,
      nftAddress: NFTContractAddress,
      url: `https://${NETWORK}.etherscan.io/nft/${NFTContractAddress}/${tokenID}`,
    };
  } catch (error) {
    console.error("Error minting NFT:", error);
  }
}

// Transfer NFT function
// actorAddress: toSend ? actorAddress -> systemAddress : systemAddress -> actorAddress
export async function transferNFT(contract, actorAddress, willSend, tokenID) {
  if (contract === null || contract === undefined) {
    console.log("transferNFT: Make instance of Contract First");
    return;
  }

  try {
    console.log(contract);
    const tx = await contract.transferNFT(actorAddress, willSend, tokenID);
    await tx.wait();
    console.log("NFT transferred successfully.");
    return true;
  } catch (error) {
    console.error("Error transferring NFT:", error);
    return false;
  }
}

export async function addInvestment(contract, investorAddress, dealID, amount) {
  if (contract === null || contract === undefined) {
    console.log("addInvestment: Make instance of Contract First");
    return;
  }

  // try {
    const tx = await contract.addInvestment(investorAddress, dealID, amount, {
      value: amount, // Sending ETH along with the transaction
    });
    let receipt = await tx.wait();

    console.log(receipt);

    console.log("Investment added successfully.");
    return true;
  // } catch (error) {
  //   console.error("Error adding investment:", error);
  //   return false;
  // }
}

export async function addDeal(
  contract,
  dealID,
  minAmt,
  targetAmt,
  floatingEndTimestamp,
  expirationTimestamp,
  tokenID,
  interestRate,
  companyAddress
) {
  if (contract === null || contract === undefined) {
    console.log("addInvestment: Make instance of Contract First");
    return;
  }

  try {
    const tx = await contract.addDeal(
      dealID,
      minAmt,
      targetAmt,
      floatingEndTimestamp,
      expirationTimestamp,
      tokenID,
      interestRate,
      companyAddress,
      {
        value: parseInt((30 * targetAmt) / 100),
      }
    );
    await tx.wait();
    console.log("Deal added successfully.");
    return true;
  } catch (error) {
    console.error("Error adding deal:", error);
    return false;
  }
}

export async function transferAllBackPerDeal(contract, dealID) {
  if (contract === null || contract === undefined) {
    console.log("transferAllBackPerDeal: Make instance of Contract First");
    return;
  }

  try {
    const tx = await contract.transferAllBackPerDeal(dealID);
    await tx.wait();
    console.log(
      "All investments transferred back successfully for deal:",
      dealID
    );
    return true;
  } catch (error) {
    console.error(
      "Error transferring back all investments for deal:",
      dealID,
      error
    );
    return false;
  }
}

export async function revertInvestment(contract, investmentID) {
  if (contract === null || contract === undefined) {
    console.log("revertInvestment: Make instance of Contract First");
    return;
  }

  try {
    const tx = await contract.revertInvestment(investmentID);
    await tx.wait();
    console.log("Investment reverted successfully.");
    return true;
  } catch (error) {
    console.error("Error reverting investment:", error);
    return false;
  }
}

export async function dealStartApproval(contract, dealID, approved) {
  if (contract === null || contract === undefined) {
    console.log("dealStartApproval: Make instance of Contract First");
    return;
  }

    const tx = await contract.dealStartApproval(dealID, approved);
    await tx.wait();
    console.log("Deal approval status updated successfully for deal:", dealID);
    return true;

}
