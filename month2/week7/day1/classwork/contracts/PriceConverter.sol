//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    //first get the price of usd in eth
    function getPrice(AggregatorV3Interface priceFeed) internal view returns(uint256) {
        (,int256 answer,,,) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);
    }

    //convert msg.value to dollar price
    function getConversionRate(uint256 _ethAmount, AggregatorV3Interface priceFeed) internal view returns(uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethToUsd = (_ethAmount * ethPrice) / 1000000000000000000;
        return ethToUsd;
    }
}