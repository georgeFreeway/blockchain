require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");

const LOCALHOST_URL = process.env.LOCALHOST_URL;
const TBNB_URL = process.env.TBNB_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_APIKEY = process.env.COINMARKETCAP_APIKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: LOCALHOST_URL,
      chainId: 31337,
    },
    tbnb: {
      url: TBNB_URL,
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_APIKEY,
  },
};
