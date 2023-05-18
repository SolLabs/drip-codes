import { NextApiRequest, NextApiResponse } from "next";
import Code from "../schema/code";

export default async function retrive(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const { retriver } = req.body;

        if (!retriver) return res.status(400).json({ message: "Missing required fields" });

        try {
            const validation = await Code.findOne({ is_retrieved: true, retriever: retriver });
            if (validation) return res.status(400).json({ message: "You already retrived a code" });

            const retrived_code = await Code.findOne({ is_retrieved: false });
            if (!retrived_code) return res.status(404).json({ message: "No codes available" });

            retrived_code.is_retrieved = true;
            retrived_code.retriever = retriver;
            await retrived_code.save();

            return res.status(200).json({ message: "Code Retrived", code: retrived_code });
        } catch (err) {
            console.error("RETRIVED CRASHED", err);
            return res.status(500).json({ message: err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}