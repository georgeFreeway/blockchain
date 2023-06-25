// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Assignment {
    //struct representing a token holder
    struct Person {
        string name;
        address wallet;
        uint256 token;
    }

    //mapping from ethereum address to struct
    mapping(address => Person) findPersonByAddress;

    //function that creates the struct and add them to the mapping
    function createPerson(string memory _name, address _wallet, uint256 _token) public {
        Person memory newPerson = Person(_name, _wallet, _token);
        findPersonByAddress[_wallet] = newPerson;
    }

    //function that allows users to transfer tokens from their account to another account
    function transferToken(address _sender, address _receiver, uint256 _tokens) public returns(bool) {
        //get balance of sender
        uint256 balanceOfSender = address(_sender).balance;
        //check if sender has enough tokens
        if(balanceOfSender < _tokens){
            revert();
        }

        //deduct tokens from sender account
        balanceOfSender -= _tokens;
        
        //add the tokens to the receiver
       (bool successful, ) = payable(_receiver).call{ value: _tokens}("");

       return successful;
    }
}