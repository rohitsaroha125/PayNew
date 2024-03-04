import User from "../models/user.js";
import ErrorObject from "../utils/ErrorObject.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import Account from "../models/account.js";

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const userControllers = {};

userControllers.signUp = async function (req, res, next) {
  try {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
      throw new Error("Inputs are not valid");
    }

    const { username, firstName, lastName, password } = req.body;
    const user = await User.create({
      username,
      firstName,
      lastName,
      password,
    });

    await Account.create({
      userId: user._id,
      balance: 1+Math.random()*10000
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: String(process.env.JWT_EXPIRY),
    });

    const { password: userPassword, ...userObj } = user.toObject();

    res.status(200).json({
      status: "ok",
      message: "User Registered Successfully",
      data: {
        user: userObj,
        token,
      },
    });
  } catch (err) {
    next(new ErrorObject(401, "fail", err));
  }
};

userControllers.signIn = async function (req, res, next) {
  try {
    const { success } = signInBody.safeParse(req.body);

    if (!success) {
      throw new Error("Invalid Inputs");
    }

    const { username, password } = req.body;

    const findUser = await User.findOne({ username, password });

    if (!findUser) {
      throw new Error("Email/Password might be wrong");
    }

    const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: String(process.env.JWT_EXPIRY),
    });

    res.status(200).json({
      status: "ok",
      message: "Sign In Successful",
      data: {
        user: findUser,
        token,
      },
    });
  } catch (err) {
    next(new ErrorObject(401, "fail", err.message));
  }
};

userControllers.updateProfile = async (req, res, next) => {
  try {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
      throw new Error("Please provide valid input");
    }

    const updateUser = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "ok",
      message: "User Profile Updated",
      data: {
        user: updateUser,
      },
    });
  } catch (err) {
    next(new ErrorObject(401, "fail", err.message));
  }
};

userControllers.filterUsers = async (req, res, next) => {
  try {
    const filter= req.query.filter || "";
    const findUsers = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.status(200).json({
      status: "ok",
      message: "User Fetched Succesfully",
      data: findUsers,
    });
  } catch (err) {
    next(new ErrorObject(401, "fail", err.message));
  }
};

export default userControllers;
