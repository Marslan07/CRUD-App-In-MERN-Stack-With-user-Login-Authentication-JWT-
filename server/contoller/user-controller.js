import User from "../schema/user-schema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addUser = async (req, res,next) => {
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
       req.body=newUser;
       next();
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
export const getUsers = async (req, res,next) => {
  try {
    
    const users = await User.find({});
    // res.status(201).json(users);
    if(users){
      req.body=users;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const getUser = async (req, res,next) => {
  // console.log(req.params.id)
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      // res.status(201).json(user);
      req.body=user;
      next();
    } else {
      res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const updateUser = async (req,res,next) => {
  let user = req.body;
  const newDate= new Date()
  const updateUser = new User({...user, updated_by:req.user.id, updated_date:newDate});
  try {
    await User.updateOne({ _id: req.params.id }, updateUser);
    // res.status(201).json(updateUser);
    req.body=updateUser;
    next()
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const deleteUser = async (req, res,next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    // res.status(201).json({ message: "User Deleted Successfully" });
    req.body={ message: "User Deleted Successfully" };
    next();
    } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const loginUser = async (req,res) => {
  //joi
  
  const user = req.body;
  const NewUser = await User(user);
  const userEmail = await User.findOne({ email: req.body.email });
  const isPasswordCorrect = await bcrypt.compare( req.body.password ,userEmail.password);
  if (userEmail) {
    if (!isPasswordCorrect) {
      return await res.status(401).json({ message: "Incorrect email or password" });
    }
    try {
      const token = Jwt.sign({ id: userEmail.id }, process.env.JWT , {expiresIn:'30m'});
      const refreshToken = Jwt.sign({ id: userEmail.id },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "30d" }
    );
      const { password } = NewUser._doc;
      res.status(200).json({ password:password,result:{userID:userEmail.id,token ,refreshToken}});
    } catch (error) {
      res.status(401).json({message:"user not found" , error: error.message});
    }
  } else {
    return await res.status(401).json({ message: "user not found" });
  } 
};

export const getrefreshToken= async(req, res,next) => {
  let { refreshToken } = req.body;
  const isValid =   Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY);
  console.log(isValid);
  if (!isValid) {
  return res.status(401).json({error: "Invalid token,try login again" });
  }
  const token = Jwt.sign( {id: isValid.id},process.env.JWT, {expiresIn: "1d"});
  const NewrefreshToken = Jwt.sign({id: isValid.id},process.env.REFRESH_TOKEN_KEY,{ expiresIn: '30d'});
  req.body={token:token ,refreshToken:NewrefreshToken};
  next();
  };
