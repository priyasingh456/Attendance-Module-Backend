const asyncHandler = require("express-async-handler");
const Student = require("../models/student");

const registerStudent = asyncHandler(async (req, res) => {
    const {name} = req.body;
    console.log(name);

    const studentList = await Student.find();
    var lastRoll = 0;
    for(let i = 0; i < studentList.length; i++){
        lastRoll = Math.max(lastRoll, studentList[i].roll);
    }
    lastRoll = lastRoll+1;

    const student = await Student.create({
        name: name,
        roll: lastRoll
    });

    if(student){
        res.status(201).json({
            name: student.name,
            roll: student.roll
        });
    }else{
        res.status(400);
        throw new Error("Error occured! Please try again!");
    }
    
})

const listStudents = asyncHandler(async(req, res) => {
    const studentList = await Student.find();
    res.status(200).json(studentList);
})

const deleteStudent = asyncHandler(async(req, res) => {
    const {roll} = req.body;
    console.log(roll)
    const student = await Student.findOne({roll});

    if(student){
        const result = await Student.deleteOne({roll});
        if(result){
            res.status(200).json({
                message: "Student deleted successfully"
            })
        }else{
            res.status(400);
            throw new Error("Error occured! Please try again!");
        }
    }else{
        res.status(400);
        throw new Error("User by this roll doesn't exists");
    }
})

module.exports = {
    registerStudent,
    listStudents,
    deleteStudent
};