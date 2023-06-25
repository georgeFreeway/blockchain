import { ethers } from "./ethers-5.1.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const button = document.getElementById("button");
button.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      button.innerHTML = "connected!";
    } catch (error) {
      console.log(error);
      button.innerHTML = "please try again";
    }
  }
});

const fundButton = document.getElementById("fund");
fundButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const ethAmount = document.getElementById("ethAmount").value;

    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });

      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
});

function listenForTransactionMine(txResponse, provider){
  return new Promise((resolve, reject) => {
    provider.once(txResponse.hash, (txReceipt) => {
      console.log(`mined with ${txReceipt.confirmations} confirmations`)
      resolve()
    })
  })
}

const balanceButton = document.getElementById("balance");
balanceButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
});

const withdraw = document.getElementById("withdraw");
withdraw.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
});
