import User from "../schema/user-schema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import { verifyRefresh } from "../Token/verifyToken.js";

export const addUser = async (req, res) => {
console.log("user is : "+ req.user.id);
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
const date= new Date();
const newUser = new User({
  ...req.body,
  password: hash,
  created_by:req.user.id,
  updated_by:req.user.id,
  created_date:date,
  updated_date:date,
});

  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return await res.status(409).json({ message: "email is already exists" });
  } else {
    try {
      await newUser.save();
      res.status(201).json({ message: "user is added", user:req.user });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  // console.log(req.params.id)
  try {
    // const user= await User.find({_id: req.params.id});
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  let user = req.body;
  const newDate= new Date()
  const updateUser = new User({...user, updated_by:req.user.id, updated_date:newDate});
  try {
    await User.updateOne({ _id: req.params.id }, updateUser);
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const loginUser = async (req,res) => {
  //joi
  // debugger
  const user = req.body;
  const NewUser = await User(user);
  const userEmail = await User.findOne({ email: req.body.email });
  const isPasswordCorrect = await bcrypt.compare( req.body.password ,userEmail.password);
  if (userEmail) {
    if (!isPasswordCorrect) {
      return await res.status(401).json({ message: "Incorrect email or password" });
    }
    try {
      const token = Jwt.sign({ id: userEmail.id }, process.env.JWT , {expiresIn:'1m'});
      const refreshToken = Jwt.sign({ id: userEmail.id },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "30d" }
    );
      const { password } = NewUser._doc;
      res.status(200).json({ password:password,result:{userID:userEmail.id,token , refreshToken}});
    } catch (error) {
      res.status(401).json({message:"user not found" , error: error.message});
    }
  } else {
    return await res.status(401).json({ message: "user not found" });
  } 
};

export const getrefreshToken= async(req, res) => {
  let { refreshToken } = req.body;
  const isValid =   Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY);
  console.log(isValid);
  if (!isValid) {
  return res.status(401).json({error: "Invalid token,try login again" });
  }
  const token = Jwt.sign( {id: isValid.id},process.env.JWT, {expiresIn: "10m"});
  const NewrefreshToken = Jwt.sign({id: isValid.id},process.env.REFRESH_TOKEN_KEY,{ expiresIn: '30d'});
  return res.status(200).json({token:token ,refreshToken:NewrefreshToken});
  };
