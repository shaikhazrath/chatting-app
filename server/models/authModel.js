import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,      
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: (email) => /\S+@\S+\.\S+/.test(email),
          message: 'Invalid email format',
        },
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    }
    
})


userSchema.pre('save',function(next){
    if (!this.isModified('password')) {
        return next();
      }
    bcrypt.hash(this.password,10,(err,hash)=>{

        if(err){
            return next()
        }
        this.password = hash
        next()
    })
})


userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id },process.env.jwtsecretKey,{expiresIn:'1hr'})
    return token
}


export default mongoose.model("User",userSchema)

