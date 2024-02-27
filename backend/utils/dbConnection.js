import mongoose from "mongoose";

async function dbConnection(){
    const data = await mongoose.connect(process.env.MONGODB_URL)
    return data
}

export default dbConnection