import mongoose from "mongoose";

const AccountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    balance:{
        type:Number,
        required: true
    }
})

const Account = mongoose.model('Account', AccountSchema)

export default Account