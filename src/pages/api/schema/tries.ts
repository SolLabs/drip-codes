import mongoose from "mongoose";

// Params Type
export interface ITries {
    _id: string;
    tries: number;
}

// Schema
const schema = new mongoose.Schema<ITries>(
    {
        _id: { type: String },
        tries: { type: Number, required: true, unique: false, trim: true, default: 0 },
    },
    { timestamps: true }
);

global.Tries = global.Tries || mongoose.model<ITries>('Tries', schema);

export default global.Tries