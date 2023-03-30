import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true
    },
    emailverified: {
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        // default: "htt"
    }
}, {timestamps: true});

// ! hashing password
UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model("User", UserSchema);
export default User;