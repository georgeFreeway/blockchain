require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */

const TBNB_URL = process.env.TBNB_URL;
const TBNB_PRIVATE_KEY = process.env.TBNB_PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    tbnb: {
      url: TBNB_URL,
      chainId: 97,
      accounts: [TBNB_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: process.env.TBNB_API_KEY,
  },
};
