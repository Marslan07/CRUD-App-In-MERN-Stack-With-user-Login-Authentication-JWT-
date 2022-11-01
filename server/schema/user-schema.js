import mongoose from "mongoose";

import autoIncrement from "mongoose-auto-increment"

const userSchema=mongoose.Schema({
    name:{
        type: String,
        default:""
    },
    email:{
        type:String,
        unique:1,
        default:""
    },
    password:{
        type:String,
        default:""
    }, 
    phone:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    created_by:{
        type:String,
        default:""
    },
    created_date:{
        type:String,
        default:""
    },
    updated_by:{
        type:String,
        default:""
    },
    updated_date:{
        type:String,
        default:""
    }
})

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'user')

const User=mongoose.model('user', userSchema);

export default User;
