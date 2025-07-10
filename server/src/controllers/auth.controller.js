import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";


export const signup = async (req,res)=>{
    const {fullName, email, password} = req.body;
    try{

        if(!fullName || !email || !password) {
            return res.status(400).json({message:"All fields are required"});
        }

        if (password.length < 6 ){
            res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const user = await User.findOne({email:email })
        if(user){
            res.status(400).json({message:"Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({fullName, email, password: hashedPassword});
        if (newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({_id:newUser._id,fullName:newUser.fullName,email:newUser.email,profilePic:newUser.profilePic});

        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    }catch(e){
        console.log("Error in signup controller "+e.meesage);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email:email });
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect)  return res.status(400).json({message:"invalid credentials"});

        generateToken(user._id,res);

        res.status(200).json({_id:user._id,fullName:user.fullName,profilePic:user.profilePic,email:user.email});
    }catch(e){
        console.log("Error in login controller",e.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = async (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Success"});
    }catch (e) {
        console.log("Error in logout controller",e.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile = async (req,res)=>{

}