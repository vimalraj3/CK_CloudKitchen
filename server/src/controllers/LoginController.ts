import { NextFunction, Request, Response } from "express";
import path from "path";
import { get, controller, post } from "./decorators";
import User, { IUser } from "../models/user.model";
import dotenv from "dotenv";
import { createUser } from "../utils/CreateUser";
import bcrypt from "bcrypt";
import { checkValidator } from "../middleware/Validators";

dotenv.config({ path: path.resolve(process.cwd(), "./src/.env") });

// TODO testing login signup | Products | multithearding
import { UserSession } from "./types/temp.types";
import { AppError } from "../utils/AppError";

@controller("/auth")
class LoginController {
  static salt: number = parseInt(process.env.SALT) || 10;

  // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message

  @post("/login")
  async postLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log("login --- ", email, password);

    const isVaildInput: boolean = checkValidator(email, password, true);
    if (!isVaildInput) {
      res.status(400).json({
        success: false,
        message: `Invalid inputs`,
      });
    }
    const user: IUser | null = await User.findOne({
      email: email,
    }).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User not found, please sign in`,
      });
      return;
    }

    if (user.password) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          next(new AppError(`Invalid email or password`, 401));
          return;
        }
        (req.session as UserSession).uid = user._id;
        res.status(200).json({
          success: true,
          user: {
            name: user.userName,
            email: user.email,
            avatar: user.avatar,
            cart: user.cart,
            products: user.products,
          },
        });
      });
    }
  }

  @post("/signup")
  async postSignup(req: Request, res: Response) {
    const { email, password, userName } = req.body;
    console.log(LoginController.salt);
    const isVaildInput: boolean = checkValidator(
      email,
      password,
      false,
      userName
    );
    if (!isVaildInput) {
      res.status(400).json({
        success: false,
        message: `Invalid inputs`,
      });
    }
    const user: IUser = await createUser(
      password,
      LoginController.salt,
      userName,
      email
    );
    if (user) {
      (req.session as UserSession).uid = user._id;
      res.status(200).json({
        success: true,
        user: {
          name: user.userName,
          email: user.email,
          cart: user.cart,
          products: user.products,
        },
      });
    } else {
      (req.session as UserSession).uid = null;
      res.status(200).json({
        success: false,
        message: `Unable to create user`,
      });
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    console.log("Logout");
    req.session.destroy((err) => {
      if (!err) {
        res.status(201).json({
          success: true,
          message: `Logout successfully`,
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: `Logout failed`,
      });
    });
  }

  @get("/getuser")
  async getUser(req: Request, res: Response) {
    const { uid } = req.session as UserSession;
    const user: IUser | null = await User.findById(uid);
    if (!user) {
      res.status(401).json({
        success: false,
        message: `Please Login`,
      });
      return;
    }
    res.status(201).json({
      success: true,
      user,
    });
  }
}
