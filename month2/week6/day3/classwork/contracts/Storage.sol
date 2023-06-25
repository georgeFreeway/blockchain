// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract StoreNumber {

    uint256 public favNumber;

    function setNumber(uint256 _number) public {
        favNumber = _number;
    }

    function getNumber() public view returns(uint256) {
        return favNumber;
    }
}