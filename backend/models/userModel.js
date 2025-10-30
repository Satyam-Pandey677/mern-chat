const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        pic:{
            type:String,
            required:true,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true
    }
)

const USER = mongoose.model("USER", userSchema);
module.exports = USER