// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./PriceConverter.sol";

contract CrowdFund {
    using PriceConverter for uint256;

    //make a constant
    uint256 constant MINIMUM_FEE = 100 * 1e18;

    address[] public funders;
    mapping(address => uint256) amountFundedByAddress;

    //mark function as payable 
    //contracts can hold funds and have addresses just like a wallet
    function fund() public payable {
        //reverts if the amount is not up to the msg.value
        require(msg.value.getConversionRate() >= MINIMUM_FEE, "Not enough, send atleast 100 USD");
        //keep track of funders
        funders.push(msg.sender);
        amountFundedByAddress[msg.sender] += msg.value;
    }

    //owner
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function withdraw() public onlyOwner{
        //loop through the funders array and then reset the balance to zero
        for(uint256 index = 0; index < funders.length; index++){
           address funder = funders[index];
           amountFundedByAddress[funder] = 0;
        }
        //an array can be mutated directly in solidity with the new keyword
        funders = new address[](0);
        (bool success,) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "withdrawal failed");
    }

    modifier onlyOwner {
        require(msg.sender == i_owner, "only owner can withdraw");
        _;
    }
}