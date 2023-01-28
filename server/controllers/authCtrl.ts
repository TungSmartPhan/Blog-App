import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";

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

      const newUser = new Users({
        name,
        account,
        password: passwordHash,
      });

      res.json({ message: "Register Successfully", data: newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
};

export default authCtrl;
