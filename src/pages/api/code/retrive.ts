import { NextApiRequest, NextApiResponse } from "next";
import database_connection from "../utils/connection";
import Code from "../schema/code";
import Tries from "../schema/tries";

export default async function retrive(req: NextApiRequest, res: NextApiResponse) {
    await database_connection();

    if (req.method == "POST") {
        const { retriver } = req.body;

        if (!retriver) return res.status(400).json({ message: "Missing required fields" });

        try {
            let tries = await Tries.findOne({ _id: retriver });
            if (!tries) {
                tries = new Tries({
                    _id: retriver,
                })
                await tries.save();
            }

            const lastDay = new Date(tries.updatedAt).getTime() / (1000 * 3600 * 24);
            const currentDay = Date.now() / (1000 * 3600 * 24);
            let days = currentDay - lastDay;
            if (tries.tries >= 2 && days < 1) return res.status(403).json({ message: 'You reached your maximum No. of tries today. Please check back in 24H' })

            const validation = await Code.findOne({ is_retrieved: true, retriever: retriver });
            if (validation) return res.status(403).json({ message: "You already retrived a code" });

            const retrived_code = await Code.findOne({ is_retrieved: false });
            if (!retrived_code) return res.status(404).json({ message: "No codes available" });

            retrived_code.is_retrieved = true;
            // if (!retrived_code.retriever) retrived_code.retriever = retriver;
            await retrived_code.save();


            tries.tries += 1
            if (tries.tries === 3) tries.tries = 1;
            await tries.save();

            return res.status(200).json({ message: "Code Retrived", code: retrived_code });
        } catch (err) {
            console.error("RETRIVED CRASHED", err);
            return res.status(500).json({ message: err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}