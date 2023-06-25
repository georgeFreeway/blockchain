const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONTEND_ADDRESSES_FILE =
  "/Users/georgeokafo/new-codelandcs-blockchain-repo/month2/week8/day2/classwork/frontend/src/constants/contractAddress.json";
const FRONTEND_ABI_FILE =
  "/Users/georgeokafo/new-codelandcs-blockchain-repo/month2/week8/day2/classwork/frontend/src/constants/abi.json";

module.exports = async function () {
  if (process.env.UPDATE_FRONTEND) {
    console.log("updating frontend");
    updateContractAbi();
    updateContractAddress();
  }
};

async function updateContractAbi() {
  const CrowdFund = await ethers.getContract("CrowdFund");
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    CrowdFund.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddress() {
  const CrowdFund = await ethers.getContract("CrowdFund");
  const chainId = network.config.chainId.toString();
  const currentAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE, "utf8")
  );

  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(CrowdFund.address)) {
      currentAddresses[chainId].push(CrowdFund.address);
    }
  }
  {
    currentAddresses[chainId] = [CrowdFund.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"];
