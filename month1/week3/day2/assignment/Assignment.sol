// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract Assignment {
    //
    struct Student {
        uint256 regNo;
        string name;
    }

    //declare an array that can only contain the struct of students
    Student[] students;

    //map the student id to the name
    mapping (uint256 => string) findStudentById;

    //declare a function to create a new student and add them to the students array
    function addStudent(uint256 _regNo, string memory _name) public {
        Student memory student1 = Student(_regNo, _name);
        students.push(student1);
        findStudentById[student1.regNo] = student1.name;
    }

    //declare a function that returns the length of the student array
    function getStudents() public view returns(uint256) {
        return students.length;
    }
}