const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        maxlength: 32,
        trim: true,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    conPassword: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: false
    },
    resetPasswordTokn: {
        type: String,
        required: false
    },
    passwordResetExprieIn: {
        type: Date,
        required: false
    }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.conPassword = await bcrypt.hash(this.conPassword, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);