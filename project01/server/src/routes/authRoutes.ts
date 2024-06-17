import { type UserInterface } from "../models/User";
import { UserService } from "../services/UserService";
import express, { type Request, type Response, type NextFunction } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

enum AdminType {
  User = 0,
  Staff = 1,
  Admin = 2,
}

const router = express.Router();

router.post("/password", (req: Request, res: Response, next) => {
  passport.authenticate(
    "local",
    (err: Error, user: UserInterface | undefined, info: { message: string }) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      if (!user) {
        return res.status(400).send(info.message);
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "your_jwt_secret",
        {
          expiresIn: "1h", // Token expiry time
        }
      );
      res.cookie("jwt", jwt, { httpOnly: true, secure: true });
      return res.status(200).json({ user, token });
    }
  )(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Profile access granted.", user: req.user });
  }
);

router.get("/admin", async (req: Request, res: Response) => {
  passport.authenticate("jwt", { session: false }, async (err: Error, user: UserInterface) => {
    if (err || !user) {
      console.error(err);
      console.log("An error occurred while checking admin status or user not found.");
      return res
        .status(500)
        .json({ error: "An error occurred while checking admin status or user not found." });
    } else {
      try {
        const userService = new UserService();
        const fetchedUser = await userService.getSingleUser(user.email);
        if (fetchedUser) {
          return res.json({ isAdmin: fetchedUser.admin });
        } else {
          return res.json({ isAdmin: false });
        }
      } catch (error) {
        console.error(error);
        console.log("An error occurred while checking admin status.");
        return res.status(500).json({ error: "An error occurred while checking admin status." });
      }
    }
  })(req, res);
});

export default router;

async function isAdminCheck(req: Request, res: Response): Promise<AdminType> {
  return new Promise<AdminType>((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, async (err: Error, user: UserInterface) => {
      if (err || !user) {
        console.log(err, user);
        console.log("An error occurred while checking admin status or user not found.");
        resolve(AdminType.User);
      } else {
        try {
          const userService = new UserService();
          const fetchedUser = await userService.getSingleUser(user.email);
          if (fetchedUser && fetchedUser.admin) {
            resolve(fetchedUser.admin);
          } else {
            resolve(AdminType.User);
          }
        } catch (error) {
          console.log("An error occurred while checking admin status.");
          resolve(AdminType.User);
        }
      }
    })(req, res);
  });
}

async function isUserRequest(
  req: Request,
  res: Response
): Promise<{ user?: UserInterface; newToken?: string }> {
  return new Promise((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, async (err: Error, user: UserInterface) => {
      if (err || !user) {
        console.log("An error occurred while checking user status or user not found.");
        return resolve({});
      } else {
        try {
          // Renew token if it's about to expire
          const token = req.headers["authorization"]?.split(" ")[1];
          if (token) {
            const decodedToken = jwt.decode(token) as { exp: number };
            const currentTime = Date.now() / 1000;
            const timeLeft = decodedToken.exp - currentTime;
            const threshold = 60 * 5; // 5 minutes

            if (timeLeft < threshold) {
              const newToken = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET || "your_jwt_secret",
                {
                  expiresIn: "15m",
                }
              );
              return resolve({ user, newToken });
            }
          }
          return resolve({ user });
        } catch (error) {
          console.log("An error occurred while checking user status.");
          return resolve({});
        }
      }
    })(req, res);
  });
}

export const userCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const isUser = await isUserRequest(req, res);
    if (!isUser) {
      return res.status(401).send("Cannot do that operation. Please log in");
    }
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    if (!email || email === isUser.user?.email) next();
    return res.status(401).send("Cannot do that operation. Please log in");
  } catch (err) {
    return res.status(401).send("Unauthorized. Please log in");
  }
};

export const userOrGreaterCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const isUser = await isUserRequest(req, res);
    if (!isUser) {
      const isAdmin = await isAdminCheck(req, res);
      if (!isAdmin) {
        return res.status(401).send("Unauthorized. Please log in");
      }
      next();
    }
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    if (!email || email === isUser.user?.email) next();
    else {
      const isAdmin = await isAdminCheck(req, res);
      if (!isAdmin) {
        return res.status(401).send("Unauthorized. Please log in");
      }
      next();
    }
  } catch (err) {
    return res.status(401).send("Unauthorized. Please log in");
  }
};

export const adminOrStaffCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) {
      return res.status(401).send("Unauthorized. Please log in");
    }
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized. Please log in");
  }
};

export const adminCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = await isAdminCheck(req, res);
    if (isAdmin != AdminType.Admin) {
      return res.status(401).send("Unauthorized. Please log in");
    }
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized. Please log in");
  }
};
