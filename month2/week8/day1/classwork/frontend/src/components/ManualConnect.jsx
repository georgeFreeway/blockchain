import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Box, Button, Heading } from "@chakra-ui/react";

const ManualConnect = () => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) {
      return;
    }
    if (typeof window !== "undefined") {
      if (localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account === null) {
        localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <Box p={"2"}>
      <Heading>Welcome to Crowd Fund Project</Heading>
      {account ? (
        <Box>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}{" "}
        </Box>
      ) : (
        <Button
          mt={"2"}
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default ManualConnect;
