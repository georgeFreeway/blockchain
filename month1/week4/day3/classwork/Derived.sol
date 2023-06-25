//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Base.sol";

contract DerivedContract is BaseContract {
    function storeNumber(uint256 _number) public override {
        myFavNumber = _number * 2;
    }
}