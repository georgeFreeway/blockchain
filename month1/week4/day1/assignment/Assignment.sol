//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FunctionModifier {
    //declare a state variable that is an ethereum address
    address public Owner;

    //set the initial value of the address to be the owner of the contract
    constructor() {
        Owner = msg.sender;
    }

    //declare a modifier function that only allows owner to transfer ownership
    modifier onlyOwner() {
        require(msg.sender == Owner, "Only Owner can transfer Ownership");
        _;
    }

    //declare a modifier function that checks if the buyer of an nft is a valid ethereum address
    modifier validAddress(address _addr) {
        require(_addr != address(0), "This is not a valid address!");
        _;
    }

    //declare a function that transfers ownership of asset to the valid ethereum address
    function transferOwnership(address _newNFTOwner) public onlyOwner validAddress(_newNFTOwner) {
        Owner = _newNFTOwner;
    } 
}