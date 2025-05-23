const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory("MyTestNFT");
  const nft = await NFT.deploy(deployer.address); // pass initial owner

  await nft.waitForDeployment();
  console.log("✅ NFT contract deployed at:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
