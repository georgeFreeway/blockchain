//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./BaseContract.sol";

contract DerivedContract is BaseContract {
    //declare an array of strings that would contain firstName variables
    string[] public firstNameArray;

    //declare a function that would override the function in the base contract, to push firstName variables into its array
    function setName(string memory _name) public override{
        firstName = _name;
        firstNameArray.push(firstName);
    }
    
}