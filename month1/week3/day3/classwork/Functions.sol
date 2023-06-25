// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Functions {
    //view function to get the balance of a contract
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    //view function to return the current timestamp
    function getCurrentTimeStamp() public view returns(uint256) {
        return block.timestamp;
    }

    //pure function that adds two numbers
    function addNumbers(uint256 a, uint256 b) public pure returns(uint256) {
        return a + b;
    }

    //pure function that checks if a string is empty
    function isEmptyString(string memory str) public pure returns (bool) {
        bytes memory strBytes = bytes(str);
        if (strBytes.length == 0) {
            return true;
        }
        return false;
    }

    //function visibility
    function doSomething() private {
        // code
    }

    //public visibility
    function doSomethingElse() public {
        //can call this private function only inside the contract
        doSomething();
    }

    //a payable function that checks if enough ether is sent
    function fund() public payable {
        if(msg.value == 0){
            revert();
        }
    }
}