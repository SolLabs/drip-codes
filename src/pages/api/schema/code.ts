import mongoose from "mongoose";

// Params Type
export interface ICode {
    poster: string;
    discord_id?: string;
    code: string;
    retriever?: string;
    is_retrieved: boolean;
}

// Schema
const schema = new mongoose.Schema<ICode>(
    {
        poster: { type: String, required: true, unique: false, trim: true },
        discord_id: { type: String, required: false, unique: false, trim: true },
        code: { type: String, required: true, unique: true, trim: true },
        retriever: { type: String, required: false, unique: false, trim: true },
        is_retrieved: { type: Boolean, required: true, unique: false, trim: true, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<ICode>("Code", schema);