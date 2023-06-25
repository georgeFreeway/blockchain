// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract MyStorage {
    uint256 myFavNumber;

    function setNumber(uint256 _num) public {
        myFavNumber = _num;
    }

    function getNumber() public view returns(uint256) {
        return myFavNumber;
    }
}