// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract SpecialFunctions {
    //constructors
    uint256 public myNumber;

    //sets the value of myNumber as soon as contract gets deployed
    constructor(uint256 _num) {
        myNumber = _num;
    }

    //fallback functions
    fallback() external {
        //do something
    }

    //recieve functions
    receive() external payable {
        // do something when funds are received
    }
}

contract Modifiers {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if(msg.sender != owner){
            revert();
            _;
        }
    }

    function doSomething() public onlyOwner {
        //execute a code
    }
}