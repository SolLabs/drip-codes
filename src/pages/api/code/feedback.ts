import { NextApiRequest, NextApiResponse } from "next";
import database_connection from "../utils/connection";
import Code from "../schema/code";
import Tries from "../schema/tries";

export default async function feedback(req: NextApiRequest, res: NextApiResponse) {
    await database_connection();

    if (req.method == "POST") {
        const { id, retriever, did_work } = req.body;
        console.log(id, retriever, did_work)
        if (!id || !retriever || did_work === undefined) return res.status(400).json({ message: "Missing required fields" });

        try {
            const check = await Code.findByIdAndUpdate(id, {
                is_retrieved: true,
                ...(
                    did_work ? { retriever } : {}
                )
            }, { new: true });
            if (!check) return res.status(404).json({ message: "sorry code dosen't exist" });

            if (!did_work) {
                const tries = await Tries.findById(retriever);
                if (!tries) return res.status(404).json({ message: 'no tries found' });

                const lastDay = new Date(tries.updatedAt).getTime() / (1000 * 3600 * 24);
                const currentDay = Date.now() / (1000 * 3600 * 24);
                let days = currentDay - lastDay;
                if (tries.tries >= 2 && days < 1) return res.status(403).json({ message: 'You reached your maximum no of tries today. Please check back in 24H' })

                const validation = await Code.findOne({ is_retrieved: true, retriever: retriever });
                if (validation) return res.status(400).json({ message: "You already retrived a code" });

                const retrived_code = await Code.findOne({ is_retrieved: false });
                if (!retrived_code) return res.status(404).json({ message: "No codes available" });

                retrived_code.is_retrieved = true;
                await retrived_code.save();

                tries.tries += 1
                if (tries.tries === 3) tries.tries = 1;
                await tries.save();


                return res.status(200).json({ message: "Feedback", code: retrived_code })
            }

            return res.status(200).json({ message: "Feedback", check })
        } catch (err) {
            console.error("feedback CRASHED", err);
            return res.status(500).json({ message: err });
        }

    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}