// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
contract Score {

    //initialize a boolean that checks a condition
    bool isTrue;
    //initialze an uint that stores a students score
    uint256 myScore;

    //declare a function that sets the score of a student with any grade
    function setScore(uint256 _num) public {
        myScore = _num;
    }

    //declare a function that checks if the score of a student is equal to ten and updates the 
    //isTrue variable
    function checkScore() public {
        isTrue = (myScore == 10);
    }

    //declare a function that returns the current state of the isTrue variable
    function getResult() public view returns (bool) {
        return isTrue;
    }
}