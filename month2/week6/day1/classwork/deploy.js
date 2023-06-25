const ethers = require("ethers");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

async function main() {
  //connect to a blockchain
  //so we would connect to our fake ganache blockchain running locally on our machine
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  //get a wallet which is a private key that would be sigining transactions
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  //get the abi of the smart contract
  const abi = fs.readFileSync("./MyStorage_sol_MyStorage.abi", "utf8");

  //get the binary code of the smart contract
  const bin = fs.readFileSync("./MyStorage_sol_MyStorage.bin", "utf8");

  //create a contract factory that would be used to depoy contracts
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("deploying, please wait.....");
  const contract = await contractFactory.deploy();

  //getting transactionReceipts
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  //console.log(deploymentReceipt);

  //interacting with the contract
  //getting the current number
  const retrieveNumber = await contract.getNumber();
  //console.log(retrieveNumber.toString());

  //setting the number
  const txResponse = await contract.setNumber("21");
  const txReceipt = await txResponse.wait(1);
  const updatedNumber = await contract.getNumber();
  console.log(updatedNumber.toString());
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
