//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract BaseContract {
    //declare a string variable that would hold a firstName value
    string firstName;

    //declare function that assigns a value to the firstName variable. The function should be able to be overridden by a contract inheriting it
    function setName(string memory _name) public virtual {
        firstName = _name;
    }

    //declare a function that retrieves the value of the firstName variable
    function getName() public view returns(string memory) {
        return firstName;
    }
}