const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

if (developmentChains.includes(network.name)) {
  describe("CrowdFundTest", () => {
    let crowdFund;
    let deployer;
    let mockV3Aggregator;
    const msgValue = ethers.utils.parseUnits("0.1", "ether");

    //before each test, deploy me some contracts
    beforeEach(async () => {
      await deployments.fixture(["all"]);
      deployer = (await getNamedAccounts()).deployer;
      crowdFund = await ethers.getContract("CrowdFund", deployer);
      mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
    });

    describe("Constructor Argument", () => {
      it("Set Constructor Argument Properly", async () => {
        const priceFeedAddress = await crowdFund.priceFeed();
        const fee = await crowdFund.getFee();
        console.log(fee.toString());
        assert.equal(priceFeedAddress, mockV3Aggregator.address);
      });
    });

    describe("Funding", () => {
      //enough eth
      it("enough ETH should be sent along or fail", async () => {
        await expect(crowdFund.fund()).to.be.reverted;
      });

      //money enters contract address
      it("updates contract balance when funded", async () => {
        //get contract old balance
        const oldCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );

        const txResponse1 = await crowdFund.fund({ value: msgValue });
        await txResponse1.wait(1);
        const txResponse2 = await crowdFund.amountFundedByAddress(deployer);

        //get contract latest balance
        const newCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );

        console.log(txResponse2.toString());

        assert.notEqual(oldCrowdFundBalance, newCrowdFundBalance);
        assert.equal(txResponse2.toString(), msgValue.toString());
      });

      it("creates lists of funders", async () => {
        await crowdFund.fund({ value: msgValue });
        const funders = await crowdFund.getFunders();
        assert.equal(funders.toString(), 1);
      });
    });

    describe("Withdrawal", () => {
      //fund account before each test
      beforeEach(async () => {
        await crowdFund.fund({ value: msgValue });
      });

      it("withdraws ETH", async () => {
        //get contract balance after funding
        const startCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );
        //get deployer balance
        const startDeployerBalance = await crowdFund.provider.getBalance(
          deployer
        );

        //withdraw money and find out gas cost through tx receipt
        const txResponse = await crowdFund.withdraw();
        const txReceipt = await txResponse.wait(1);
        const { gasUsed, effectiveGasPrice } = txReceipt;
        const gasCost = gasUsed.mul(effectiveGasPrice);

        //get contract balance after withdrawal
        const endCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );
        //get deployer balance after withdrawal
        const endDeployerBalance = await crowdFund.provider.getBalance(
          deployer
        );

        //contract balance should equal 0 after withdrawal
        assert.equal(endCrowdFundBalance, 0);
        //contract balance prior to withdrawal + deployer balance prior,
        //should equal deployer balance after withdrawal + gas cost
        assert.equal(
          startCrowdFundBalance.add(startDeployerBalance),
          endDeployerBalance.add(gasCost).toString()
        );
      });

      it("withdraws from multiple funders", async () => {
        const accounts = await ethers.getSigners();

        //random person funds contract
        for (let i = 1; i < 4; i++) {
          const crowdFundConnectedContract = await crowdFund.connect(
            accounts[i]
          );
          await crowdFundConnectedContract.fund({ value: msgValue });
        }

        const startCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );
        const startDeployerBalance = await crowdFund.provider.getBalance(
          deployer
        );

        const txResponse = await crowdFund.withdraw();
        const txReceipt = await txResponse.wait(1);
        const { gasUsed, effectiveGasPrice } = txReceipt;
        const gasCost = gasUsed.mul(effectiveGasPrice);

        const endCrowdFundBalance = await crowdFund.provider.getBalance(
          crowdFund.address
        );
        const endDeployerBalance = await crowdFund.provider.getBalance(
          deployer
        );

        assert.equal(endCrowdFundBalance, 0);
        assert.equal(
          startCrowdFundBalance.add(startDeployerBalance),
          endDeployerBalance.add(gasCost).toString()
        );

        //funders be cleared
        const fundersArray = await crowdFund.getFunders();
        assert.equal(fundersArray.toString(), 0);

        for (let i = 1; i < 4; i++) {
          assert(await crowdFund.amountFundedByAddress(accounts[i].address), 0);
        }
      });

      it("only owner can withdraw", async () => {
        const accounts = await ethers.getSigners();
        const hacker = accounts[1];
        const hackerConnectedContract = await crowdFund.connect(hacker);

        await expect(hackerConnectedContract.withdraw()).to.be.reverted;
      });
    });
  });
}
