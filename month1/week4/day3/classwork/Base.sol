//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BaseContract {
    uint256 myFavNumber;

    function storeNumber(uint256 _number) public virtual {
        myFavNumber = _number;
    }

    function getNumber() public view returns(uint256) {
        return myFavNumber;
    }
}