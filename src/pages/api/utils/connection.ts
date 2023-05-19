import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://rockstar:F4DEA959@cluster0.d0vyn.mongodb.net/drip?retryWrites=true&w=majority";

const database_connection = async () => {
    if (global.connection?.isConnected) {
        console.log("reusing database connection")
        return;
    }

    const database = await mongoose.connect(MONGO_URI, {
        authSource: "admin",
    });

    global.connection = { isConnected: database.connections[0].readyState }
    console.log("new database connection created")

};

export default database_connection;