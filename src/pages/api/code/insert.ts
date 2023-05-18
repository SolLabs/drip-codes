import { NextApiRequest, NextApiResponse } from "next";
import Code from "../schema/code";

export default async function insert(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const { code, poster } = req.body;

        if (!code && !poster) return res.status(400).json({ message: "Missing required fields" });

        try {
            const newCode = new Code({
                poster: poster,
                code: code,
                is_retrieved: false,
                retriever: null,
                discord_id: null,
            });
            await newCode.save();

            return res.status(200).json({ message: "Code inserted" });
        } catch (err) {
            return res.status(500).json({ message: err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}