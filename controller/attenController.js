const asyncHandler = require("express-async-handler");
const Attendence = require("../models/attendence");

const updateAttendence = asyncHandler(async(req, res) => {
    const {teacherName, date, presentList} = req.body;
    console.log(teacherName, date, presentList);

    const attendenceExists = await Attendence.findOne({date});

    if(attendenceExists){
        res.status(400);
        throw new Error("Attendence for this date has already been taken!");
    }
    
    const attendence = await Attendence.create({
        teacherName: teacherName,
        date: date,
        presentList: presentList
    });

    if(attendence){
        res.status(201).json(attendence);
    }else{
        res.status(400);
        throw new Error("Error occured!");
    }
})

const getAttendenceList = asyncHandler(async(req, res) => {
    try{
        const attendenceList = await Attendence.find();
        return res.status(200).json(attendenceList);
    }catch(err){
        res.status(400);
        throw new Error("Error occurred!");
    }
    
})


module.exports = {
    updateAttendence,
    getAttendenceList
};