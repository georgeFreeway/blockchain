//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    //note that libraries can only have an internal visibility
    //they can neither store a state or modify one
    //first get the price of usd in eth
    function getPrice() internal view returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    //convert msg.value to dollar price
    function getConversionRate(uint256 _ethAmount) internal view returns(uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethToUsd = (_ethAmount * ethPrice) / 1e18;
        return ethToUsd;
    }
}