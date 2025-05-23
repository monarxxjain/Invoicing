const hre = require("hardhat");

const NFT_CONTRACT = "0x579832Cda1FECa13906C869d63111164177ee530"; // <- replace after deployment
const RECEIVER = "0xc9fF3D405b9C0225aF4b983228a84FCDd59dd520"; // <- your Sepolia wallet


async function main() {
    const nft = await hre.ethers.getContractAt("MyTestNFT", NFT_CONTRACT);
  
    const tx = await nft.mintNFT(RECEIVER);
    await tx.wait();
  
    // Fetch the latest tokenCounter to get the minted token ID
    const tokenId = await nft.tokenCounter();
    
    console.log(`✅ Minted NFT to ${RECEIVER} with Token ID: ${tokenId.toString()}`);
  }
  
  main().catch((error) => {
    console.error("❌ Minting failed:", error);
    process.exitCode = 1;
  });