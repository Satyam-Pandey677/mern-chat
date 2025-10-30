const bcrypt = require("bcrypt")
const User = require("../models/userModel");

const createUser = async(req, res) => {
    const {username, email,password,pic} = req.body;

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
            pic:user.pic
        })
    }else{
        res.status(400)
        throw new Error("failed to create a user")
    }

}


module.exports = {createUser}