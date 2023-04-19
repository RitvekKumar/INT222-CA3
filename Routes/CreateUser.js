import express from "express";
import User from "../Models/User.js";
import  {body, validationResult}  from "express-validator";
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post(
  "/createUser",
  [
    body('email').isEmail(),
    body('password').isLength({min : 5}),
    body('name').isLength({min : 1})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: setPassword,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

export default router;