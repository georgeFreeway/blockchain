// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract StructTypes {
    //declare a struct
    struct Student {
        uint256 regNo;
        bool isGraduated;
        address wallet;
    }

    //instantiate a struct
    Student newStudent = Student(100, false, 0x1234567890123456789012345678901234567890);

    //accessing variables of a struct
    uint256 regNo = newStudent.regNo;

    //array of our defined struct
    Student[] students;

    //nested struct
    struct School {
        string schoolName;
        Student[] students;
        bool isVerified;
    }

    //instantiating a school
    School newSchool = School("codelandcs", new Student[](0), true);

    //adding a student to the school
    function addStudent() public {
        newSchool.students.push(newStudent);
    }

    //return name of school
    function getSchoolName() public view returns(string memory) {
        return newSchool.schoolName;
    }
    
}

contract EnumTypes {
    //enum showing the level for a course
    enum Level {
        Started,
        InProgress,
        Completed
    }

    Level currentLevel;

    function setLevel(Level _level) public {
        currentLevel = _level;
    }


    function getCurrentLevel() public view returns(Level){
        return currentLevel;
    }

}

contract StringTypes {
    string myText = "welcome to codelandcs";
}

contract ArrayTypes {
    //fixed sized array
    int[10] myNumbers;

    //dynamic array
    int[] myNumbers2;

    struct Person {
        string name;
        uint256 age;
    }

    Person[] people;
}

contract MappingsTypes {
    //a mapping that shows the amount in an ethereum address
    mapping(address => uint256) balances;

    //storing structs
    struct Person {
        string name;
        uint256 age;
    }

    //storing structs
    mapping(address => Person) people;

    function addPerson(string memory name, uint256 age) public {
        Person memory newPerson = Person(name, age);
        people[msg.sender] = newPerson;
    }   
}