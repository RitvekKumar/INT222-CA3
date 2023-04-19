import express from "express";
import User from "../Models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = "ahsjucbdhebdusncujsoicnduxhdybncjcksomcid";
const router = express.Router();

router.post(
  "/logIn",
  [
    body("email").isEmail(),
    body("email").isLength({ min: 7 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let email = req.body.email;
    console.log(email);
    try {
      const userData = await User.findOne({email});
      console.log(userData);

      if (!userData)
        return res
          .status(400)
          .json({ errors: "Enter the correct credentials :(" });

      const pwdCompare = bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare)
        return res
          .status(400)
          .json({ errors: "Enter the correct credentials :(" });

      const data = {
        user : {
          id : userData.id,
        }
      }

      const authToken =  jwt.sign(data, jwtSecret);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

export default router;