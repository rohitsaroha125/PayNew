import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength:30
    },
    firstName:{
        type: String,
        required: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        maxLength: 50
    },
    password:{
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

export default User