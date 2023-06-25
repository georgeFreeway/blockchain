const networkConfig = {
  97: {
    name: "tbnb",
    ethUsdPriceFeed: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  },
};

const developmentChains = ["hardhat", "localhost"];
const decimals = 8;
const init_answer = 200000000000;

module.exports = { networkConfig, developmentChains, decimals, init_answer };
