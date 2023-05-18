import mongoose from "mongoose";
import colors from "colors";

mongoose.Promise = global.Promise;
const connection = async () => {
    await mongoose
        .connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        })
        .then(() => {
            console.log(colors.bgBlue("Connected to MongoDB"));
        })
        .catch(err => {
            console.log(colors.bgRed("MongoDB connection error"));
            console.error(err);
        });
}

export default connection;