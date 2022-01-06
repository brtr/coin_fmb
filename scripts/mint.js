const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("FeedMob");
  const { CONTRACT_ADDRESS, OWNER_ADDRESS } = process.env;
  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(1, OWNER_ADDRESS);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});