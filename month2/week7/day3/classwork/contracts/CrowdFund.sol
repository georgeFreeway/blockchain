//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PriceConverter.sol";

error CrowdFund__NotOnwer();
error CrowdFund__NotEnough();
error CrowdFund__WithdrawalFailed();

contract CrowdFund {
    using PriceConverter for uint256;

    //state variables
    uint256 private constant MINIMUM_FEE = 50 * 1e18;
    address[] private funders;
    mapping(address => uint256) public amountFundedByAddress;
    address private immutable i_owner;
    AggregatorV3Interface public priceFeed;
    
    constructor(address _priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    modifier onlyOwner() {
       if(msg.sender != i_owner){
        revert CrowdFund__NotOnwer();
       }
        _;
    }
    
    function fund() public payable {
        //reverts if the amount is not up to the msg.value
        if(msg.value.getConversionRate(priceFeed) < MINIMUM_FEE){
            revert CrowdFund__NotEnough();
        }
        //keep track of funders
        funders.push(msg.sender);
        amountFundedByAddress[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        //loop through the funders array and then reset a funder balance to zero
        for(uint256 index = 0; index < funders.length; index++){
           address funder = funders[index];
           amountFundedByAddress[funder] = 0;
        }
        //an array can be mutated directly in solidity with the new keyword
        funders = new address[](0);
        (bool success,) = payable(msg.sender).call{value: address(this).balance}("");
        if(!success){
            revert CrowdFund__WithdrawalFailed();
        }
    }

    //getter functions
    function getFee() public pure returns(uint256) {
        return MINIMUM_FEE;
    }

    function getFunders() public view returns(uint256) {
        return funders.length;
    }

    function getOwner() public view returns(address) {
        return i_owner;
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