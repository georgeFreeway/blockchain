import React from "react";
import { ConnectButton } from "web3uikit";
import { Box, Text } from "@chakra-ui/react";

const Connect = () => {
  return (
    <Box py={"2"} px={"2"}>
      <Text color={"gray.600"} fontWeight={"bold"}>
        Hi, Welcome to Crowd Fund Project
      </Text>
      <Box mt={"2"}>
        <ConnectButton moralisAuth={false} />
      </Box>
    </Box>
  );
};

export default Connect;
