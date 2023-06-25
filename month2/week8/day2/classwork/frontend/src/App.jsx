import { useState } from "react";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { ChakraProvider } from "@chakra-ui/react";

//components
import Navbar from "./components/Navbar";
import Connect from "./components/Connect";
import Fund from "./components/Fund";

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider>
        <NotificationProvider>
          <Navbar />
          <Connect />
          <Fund />
        </NotificationProvider>
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default App;
