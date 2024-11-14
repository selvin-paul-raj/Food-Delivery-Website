import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'food-DB' // Set the database name directly here
        });

        mongoose.connection.on("connected", () => {
            console.log("Database is connected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Database connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Database is disconnected");
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
