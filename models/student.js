const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    roll:{
        type: Number,
        required: true,
        maxlength: 32,
        unique:true
    }
});

module.exports = mongoose.model("Student", studentSchema);