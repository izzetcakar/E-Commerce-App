import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

//REGISTER
export const register = async (req, res) => {

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const doesExist = await User.findOne({ email: req.body.email });
  if (doesExist) return res.status(400).json("E-mail already taken");

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }

};

//LOGIN
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong credentials!");


    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: user._id }, "jwtSecretKey", { expiresIn: "2w" });
    const { password, ...other } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
    })
      .status(200)
      .json(other);

  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGOUT
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out")
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
  } catch (error) {
    return res.status(500).json("Server Error");
  }
}

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user)
  }
  else {
    res.status(404).json('User not found');
  }
}

export const getAllUsers = async (req, res) => {
  const users = User.find();
  res.json(users);
}

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json('User removed');
  } catch (error) {
    res.status(404).json('User not found');
  }
}

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...other } = user._doc;
  if (user) {
    res.json(user);
  }
  else {
    res.status(404).json('User not found');
  }
}
export const updateUserByAdmin = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (error) {
    return res.status(500).json("Server Error");
  }
}