const { getNamedAccounts, network } = require("hardhat");
const { assert } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

if (!developmentChains.includes(network.name)) {
  describe("CrowdFundIntegrationTest", () => {
    let crowdFund;
    let deployer;
    const msgValue = "110000000";

    beforeEach(async () => {
      deployer = (await getNamedAccounts()).deployer;
      crowdFund = await ethers.getContract("CrowdFund", deployer);
    });

    //fund and withdraw
    it("fund and withdraw", async () => {
      await crowdFund.fund({ value: msgValue });
      await crowdFund.withdraw();

      const finalBalance = await crowdFund.provider.getBalance(
        crowdFund.address
      );
      assert.equal(finalBalance.toString(), 0);
    });
  });
}
