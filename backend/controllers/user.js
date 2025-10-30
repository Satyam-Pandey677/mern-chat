const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const createUser = async(req, res) => {
    const {username, email,password,pic} = req.body;

    console.log(password)

    if(!username && !email && !password){
        res.send("All Filds are required")
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400);
        throw new Error("user already exists");
    }

    const user =  await User.create({
        username,
        email,
        password,
        pic,
        
    });

    if(user){
        res.status(201)
        .json({
            _id:user._id,
            name:user.username,
            email:user.email,
            pic:user.pic,
            token:generateToken  (user._Id),
        })
    }else{
        res.status(400)
        throw new Error("failed to create a user")
    }

}


const auth = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password)) ){
        res.json({
            _Id:user._Id,
            name:user.name,
            email:user.email,   
            pic:user.pic,
            token:generateToken(user._Id)
        })
    }
}


module.exports = {createUser, auth}