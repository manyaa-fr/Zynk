const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require ("../models/user");
const { address } = require("framer-motion/client");

const signup = async(req, res) => {
    const {name, username, country, state, city, email, password} = req.body;

    if (!name || !email || !username || !country || !state || !city || !password){
        return res.status(400).json({success: false, message: "Please provide all the details"})
    }

    try {
        const existingUser = await userModel.findOne({email});

        if (existingUser){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // FIX: Use nested location object
        const user = await userModel.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            address: {
              country: req.body.country,
              state: req.body.state,
              city: req.body.city,
            }
          });
      

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({success: true, message: user});

    } catch(err){
        res.status(500).json({success: false, message: err.message})
    }

}


const login = async(req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and Password are required"})
    }

    try {
        const user = await userModel.findOne({email});

        if (!user){
            return res.status(400).json({success: false, message: "Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({success: false, message: "Invalid Password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({success: true, message: user});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({success: true, message: "Logged Out"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {signup, login, logout};