const { ethers } = require("hardhat");

async function main() {
  const StorageFactory = await ethers.getContractFactory("StoreNumber");
  const Storage = await StorageFactory.deploy();
  await Storage.deployed();

  console.log(Storage.address);
  const currentValue = await Storage.getNumber();
  console.log(currentValue.toString());

  const txResponse = await Storage.setNumber("21");
  const txReceipt = await txResponse.wait(1);

  const updatedValue = await Storage.getNumber();
  console.log(updatedValue.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
