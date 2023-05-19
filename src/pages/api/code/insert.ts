import { NextApiRequest, NextApiResponse } from "next";
import database_connection from "../utils/connection";
import Code from "../schema/code";

export default async function insert(req: NextApiRequest, res: NextApiResponse) {
    await database_connection();

    if (req.method == "POST") {
        const { code, poster } = req.body;

        if (!code && !poster) return res.status(400).json({ message: "Missing required fields" });

        try {
            const newCode = new Code({
                poster,
                discord_id: null,
                code,
                retriever: null,
                is_retrieved: false,
            });
            await newCode.save();

            return res.status(200).json({ message: "Code inserted" });
        } catch (err) {
            return res.status(500).json({ message: 'Code Already Exists', err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}