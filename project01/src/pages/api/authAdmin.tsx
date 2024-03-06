import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/models/User";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const data = await User.findOne({ email });
    if (data.admin) {
      res.json(true);
    }
    res.json(false);
  }
}
