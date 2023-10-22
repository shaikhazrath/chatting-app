import User from "../models/authModel.js"
import bcrypt from 'bcrypt'




export const Register = async (req, res) => {
    try {
        const { email, username, password } = req.body

      const user = await User.findOne({ username });

      if (user) {
        return res.status(404).json("username already taken");
      } 
      
        const newUser = new User({
            email,
            password,
            username
        })
      
        await newUser.save()
        const token = newUser.generateToken()
        res.status(201).json({
            user: newUser,
            token,
            message: 'user registerd successfully'
        })
    } catch (error) {
     

        res.status(500).json('An error occurred during registration');

      
    } 
}


export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json("Invalid credentials");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json("Invalid credentials");
      }
  
      const token = user.generateToken();
      res.status(200).json({
        user,
        token,
        message: "User login successful"
      });
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };