import { generateActiveToken } from "./../config/generateToken";
import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { validateEmail } from "../middleware/validation";
import sendMail from "../config/sendMail";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ message: "Email or phone already registered" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        account,
        password: passwordHash,
      };

      const active_token = generateActiveToken( newUser ); //=> generate the new token for new user
      const url = `${CLIENT_URL}/active/${active_token}`; //should right the form with text "active" correctly not activate
      console.log("url: ", url);

      if (validateEmail(account)) {
        sendMail(account, url, "Verify your email address."); //=> sendMail (account of users, url activate for that account , note)
        return res.json({
          message: "Register Successfully, Please check your email address",
          // - After successful. don't return the data , just return the activate code for that user
          // data: newUser,
          // active_token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
};

export default authCtrl;
