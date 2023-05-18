import { NextApiRequest, NextApiResponse } from "next";
import Code from "../schema/code";

export default async function insert(req: NextApiRequest, res: NextApiResponse) {
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
            console.error(err);
            return res.status(500).json({ message: 'error in inserting', err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}