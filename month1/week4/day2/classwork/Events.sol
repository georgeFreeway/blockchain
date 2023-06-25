// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract EventTypes {
    event NumberAdded(uint256 sum);

    //add two numbers and emit an event
    function addNumber(uint256 a, uint256 b) public returns(uint256) {
        uint256 sum = a + b;
     
        //emit an event
        emit NumberAdded(sum);

        return sum;
    }
}