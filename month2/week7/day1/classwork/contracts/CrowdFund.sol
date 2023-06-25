//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PriceConverter.sol";

contract CrowdFund {
    using PriceConverter for uint256;

    //state variables
    uint256 private minimumFee = 50 * 10 ** 18;
    address[] private funders;
    mapping(address => uint256) public amountFundedByAddress;
    address private owner;
    AggregatorV3Interface private priceFeed;
    
    constructor(address _priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    modifier onlyOwner() {
       require(msg.sender == owner, "only owner can withdraw");
        _;
    }
    
    function fund() public payable {
        //reverts if the amount is not up to the msg.value
        require(msg.value.getConversionRate(priceFeed) > 0, "enough funds is requireds");
        //keep track of funders
        funders.push(msg.sender);
        amountFundedByAddress[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        //loop through the funders array and then reset the a funder balance to zero
        for(uint256 index = 0; index < funders.length; index++){
           address funder = funders[index];
           amountFundedByAddress[funder] = 0;
        }
        //an array can be mutated directly in solidity with the new keyword
        funders = new address[](0);
        (bool success,) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "withdrawal failed");
    }

    //getter functions
    function getFee() public view returns(uint256) {
        return minimumFee;
    }

    function getFunders() public view returns(uint256) {
        return funders.length;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}