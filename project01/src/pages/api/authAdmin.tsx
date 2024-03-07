import type { NextApiRequest, NextApiResponse } from "next";
import { User, type UserModel } from "~/models/User"; // Import UserModel interface
import { mongooseConnect } from "~/lib/mongoose";

interface ReqBody {
  email: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await mongooseConnect();

    const { email }: ReqBody = req.body as ReqBody;
    // Use UserModel interface to specify the type of User model
    try {
      const admin = await (User as UserModel).findOne(
        { email: email },
        "admin",
      );
      if (admin) {
        // Check if data exists before accessing admin property
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      console.log(err);
      res.json(false);
    }
  }
}
