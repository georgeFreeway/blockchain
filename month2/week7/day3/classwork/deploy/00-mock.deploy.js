const { network } = require("hardhat");
const {
  developmentChains,
  decimals,
  init_answer,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(network.name)) {
    log("local network detected");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [decimals, init_answer],
    });
    log("mock deployed!");
    log("--------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
