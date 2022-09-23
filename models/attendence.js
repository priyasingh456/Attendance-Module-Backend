const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
    teacherName:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    date:{
        type: String,
        required: true,
        unique:true
    },
    presentList:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("Attendence", attendenceSchema);