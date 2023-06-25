import React, { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { abi, contractAddress } from "../constants/index";
import { ethers } from "ethers";

const Fund = () => {
  const [fee, setFee] = useState("0");
  const [owner, setOwner] = useState("0");
  const [funders, setFunders] = useState("0");
  const [contractBalance, setContractBalance] = useState("0");

  const dispatch = useNotification();
  const { chainId, isWeb3Enabled } = useMoralis();
  const chainIdPlain = parseInt(chainId);
  const crowdFundAddress =
    chainIdPlain in contractAddress ? contractAddress[chainIdPlain][0] : null;

  const { runContractFunction: fund } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "fund",
    params: {},
    msgValue: fee,
  });

  const { runContractFunction: withdraw } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "withdraw",
    params: {},
  });

  const { runContractFunction: getFee } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "getFee",
    params: {},
  });

  const { runContractFunction: getOwner } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "getOwner",
    params: {},
  });

  const { runContractFunction: getFunders } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "getFunders",
    params: {},
  });

  const {
    runContractFunction: getContractBalance,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: crowdFundAddress,
    functionName: "getContractBalance",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    console.log(tx);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction complete",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  //updating the ui with basic info
  async function updateUI() {
    const result = (await getFee()).toString();
    const owner = (await getOwner()).toString();
    const funders = (await getFunders()).toString();
    const contractBalance = (await getContractBalance()).toString();
    setFee(result);
    setOwner(owner);
    setFunders(funders);
    setContractBalance(contractBalance);
  }

  return (
    <Box px={"2"}>
      {crowdFundAddress ? (
        <Box>
          {" "}
          <Heading>
            Welcome. The Least you can fund is{" "}
            {ethers.utils.formatUnits(fee, "ether")} ETH
          </Heading>
          <Text fontWeight={"bold"}>
            Contract Balance:{" "}
            {ethers.utils.formatUnits(contractBalance, "ether")} ETH
          </Text>
          <Text fontWeight={"bold"}>Contract Owner: {owner}</Text>
          <Text fontWeight={"bold"}>Funders: {funders}</Text>
          <Box mt={"5"} display={"flex"} gap={"2"}>
            <Button
              colorScheme="green"
              disabled={isFetching || isLoading}
              onClick={async () => {
                await fund({
                  onSuccess: handleSuccess,
                });
              }}
            >
              Fund
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                await withdraw({
                  onSuccess: handleSuccess,
                });
              }}
            >
              Withdraw
            </Button>
          </Box>
        </Box>
      ) : (
        <Text>No Address Detected!</Text>
      )}
    </Box>
  );
};

export default Fund;
