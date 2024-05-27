import { mongooseConnect } from "~/lib/mongoose";
import { User, type UserModel, type UserInterface } from "~/models/User";

export class UserService {
  /* eslint-disable */
  async getUser(input: string | string[]) {
    await mongooseConnect();
    if (Array.isArray(input)) {
      const result = (await (User as UserModel).find({
        email: input,
      })) as UserInterface[];
      return result;
    } else {
      const result = (await (User as UserModel).findOne({
        email: input,
      })) as UserInterface;
      return result;
    }
  }
  async getSingleUser(input: string) {
    await mongooseConnect();
    try {
      const result = await (User as UserModel)
        .findOne({ email: input })
        .lean() // Use lean query
        .exec();

      if (!result) {
        console.log("User not found");
        return null;
      } else {
        return result as unknown as UserInterface; //TODO: remove that unknown, it gives strange error without it
      }
    } catch (err) {
      console.error("Error retrieving order:", err);
      return null;
    }
  }
  /* eslint-enable */
  async updateUser(input: UserInterface) {
    await mongooseConnect();
    const { email, ...rest } = input;
    try {
      const res = await (User as UserModel).findOneAndUpdate({ email }, rest, {
        new: true,
      });
      if (!res) {
        return { message: "error" };
      }
      return { message: "success" };
    } catch (err) {
      console.log(err);
    }
  }

  async patchUser(email: string, input: object) {
    await mongooseConnect();
    try {
      const res = await (User as UserModel).findOneAndUpdate({ email }, input, {
        new: true,
      });
      if (!res) {
        return { message: "error" };
      }
      return { message: "success" };
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(input: UserInterface) {
    await mongooseConnect();
    try {
      const res = await (User as UserModel).create(input);
      return { message: res ? "success" : "error: couldn't create user" };
    } catch (err) {
      console.log(err);
      return { message: err };
    }
  }
}
