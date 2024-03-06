// import { NextApiRequest, NextApiResponse } from "next";
// import { User } from "~/models/User";

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "POST") {
//     const { email } = req.body;
//     const data = await User.findOne({ email });
//     if(data.admin){
//         res.json(true);
//     }
//     res.json(false);
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { User, UserModel } from "~/models/User"; // Import UserModel interface

interface ReqBody {
  email: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email }: { email: string } = req.body as ReqBody;
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
