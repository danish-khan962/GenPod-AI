import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection to MongoDB database is successfull...");
    }catch(err){
        console.error("MongoDB connection Error:", err);
        process.exit(1);
    }
};

export default connectDB;