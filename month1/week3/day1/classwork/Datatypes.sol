// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Booleantype {
    //boolean declaration
    bool isTrue = true;
    bool isFalse = false;

    //booleans with if statements
    function run() public view {
        if(isTrue) {
            //execute code
        }    
    }

    //booleans with if statements
    function loop() public view {
        while(isTrue) {
            //loop code
        }    
    }

   //booleans returning value
   function checkNumber(uint256 _number) public pure returns(bool) {
        if(_number % 2 == 0){
            return true;
        }else {
            return false;
        }
    }

   //booleans and logical conditions
   function logicalOne() public view {
        if(isTrue && isFalse){
            //execute code
        }
    }

       function logicalTwo() public view {
        if(isTrue || isFalse){
            //execute code
        }
    }
}

contract Integers {
    int16 myInt;

    uint8 myUint;
}

contract AddressTypes {
    //strings
    address myAddress;

    //the address function
    address myAddress2 = address(0x1234567890123456789012345678901234567890);
}

contract BytesType {

   function hashText(string memory _input) public pure returns (bytes32) {
        return sha256(abi.encode(_input));
    }

    bytes myString = "codelandcs rocks!";
}
